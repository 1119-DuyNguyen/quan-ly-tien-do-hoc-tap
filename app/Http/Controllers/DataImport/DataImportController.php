<?php

namespace App\Http\Controllers\DataImport;

use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ImportExcelToCollection;
use App\Imports\ImportExcelToModel;
use Exception;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;


class DataImportController extends ApiController
{
    private $input;
    private $files;
    private $mess;
    function __invoke(Request $request){
        // $request->validated();
        // return [
        //     [
        //         'files' => 0,
        //         'sheets' => [
        //             [
        //                 'name' => 'HP-GV',
        //                 'header-row' => 4
        //             ]
        //         ]
        //     ]
        // ];
        // dd($request->file());

        $this->files = $request->file('files');

        $this->input = $request->input();
        // dd($this->files);

        // // Import giangvien

        // $this->importEachType('giang-vien',
        // new GiangVienImportInfo());

        // //Import hocphan

        // $this->importEachType('hoc-phan',
        // new HocPhanImportInfo());

        // //Import khoi kien thuc
        // $this->importEachType('khoi-kien-thuc',
        // new KhoiKienThucImportInfo());
        // return $this->mess;

        Excel::import(new ImportExcelToCollection(0, ["CNTT-CLC-kehoachGV"], [], ''), $this->files[0]);
        return $this->success('ok');
    }



    function importEachType($inputKey, $info){
        //Check valid input

        if (!isset($this->input[$inputKey]))
            return;
        $input = json_decode($this->input[$inputKey]);
        if ($input == null)
            $this->mess[$inputKey]['input-error'] = 'value input không phù hợp';


        $this->mess[$inputKey] = [];

        if($input != null){
            foreach($input as $index=>$importInfo){
                $this->mess[$inputKey][$index] = [
                    'input-error' => false
                ];

                if (!isset($importInfo->header)){
                    // $this->mess[$inputKey][$index]['header'] = false;
                    $this->mess[$inputKey][$index]['input-error'] = 'không tìm thấy value header';
                }

                if (!isset($importInfo->sheets)){
                    // $this->mess[$inputKey][$index]['sheets'] = false;
                    $this->mess[$inputKey][$index]['input-error'] = 'không tìm thấy value sheets';

                }
                if (!isset($importInfo->file)){
                    // $this->mess[$inputKey][$index]['file'] = false;
                    $this->mess[$inputKey][$index]['input-error'] = 'không tìm thấy value file';

                }

                if ($this->mess[$inputKey][$index]['input-error'] != false) continue;

                $this->mess[$inputKey][$index]['file-import'] = $this->import(
                    $importInfo->header,
                    $importInfo->sheets,
                    $info,
                    $this->files[$importInfo->file],
                    ImportExcelToModel::class
                );
            }
        }
    }



    function import($header_row, $sheetNames, $info, $file, $class){
        $failures = [];
        try {
            $importer = new $class(
                                $header_row,
                                $sheetNames,
                                $info->RowRules(),
                                $info->RowToModel());
            // Closure::bind($info->RowToModel(), null, $importer);
            // dd($importer->sheets());
            $importer->import($file);
            foreach ($importer->failures() as $fail){
                array_push($failures, [
                    $fail->row(), // row that went wrong
                    // $fail->attribute(), // either heading key (if using heading row concern) or column index
                    $fail->errors(), // Actual error messages from Laravel validator
                    $fail->values()[$fail->attribute()]
                ]);
            }
        }
        catch (Exception $e){
            return [
                'err' => true,
                'mess' => $e->getMessage()
            ];
        }
        return [
            'err' => false,
            'failures' => $failures
        ];

    }

}
