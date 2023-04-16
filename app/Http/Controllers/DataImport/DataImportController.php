<?php

namespace App\Http\Controllers\DataImport;

use App\Imports\ImportExcel;
use Exception;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class DataImportController extends ApiController
{
    private $input;
    private $files;
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
        // dd($this->input);
        $mess = [];
        //Import giangvien
        // array_push($mess,
        // $this->importEachType('giang-vien',
        // new GiangVienImportInfo()));

        //Import hocphan
        array_push($mess,
        $this->importEachType('hoc-phan',
        new HocPhanImportInfo()));


        return $mess;
    }

    function importEachType($inputKey, $info){
        //Import Giang Vien
        $mess = [];
        $input = json_decode($this->input[$inputKey]);
        if($input != null){
            foreach($input as $importInfo){
                array_push($mess,$this
                ->import(
                    $importInfo->header,
                    $importInfo->sheets,
                    $info,
                    $this->files[$importInfo->file],
                    ImportExcel::class));
            }
        }
        return $mess;
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
