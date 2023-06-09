<?php

namespace App\Http\Controllers;

use App\Exports\ExportExcelFromModel;
use App\Http\Controllers\DataImportInfo\GiangVienImportInfo;
use App\Http\Controllers\DataImportInfo\HocPhanImportInfo;
use App\Http\Controllers\DataImportInfo\KhoaImportInfo;
use App\Http\Controllers\DataImportInfo\KhoiKienThucImportInfo;
use App\Http\Controllers\DataImportInfo\NganhImportInfo;
use App\Http\Controllers\DataImportInfo\SinhVienImportInfo;

use App\Models\Authorization\TaiKhoan;
use App\Models\Nganh;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use Exception;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class DataImportController extends ApiController
{
    private $input;
    private $files;
    private $res;
    function __invoke(Request $request){

        $this->files = $request->file('files');

        $this->input = $request->input();

        // dd($this->files);

        $this->importEachType('khoa', new KhoaImportInfo());

        $this->importEachType('nganh', new NganhImportInfo());

        $this->importEachType('giang-vien', new GiangVienImportInfo());

        $this->importEachType('hoc-phan', new HocPhanImportInfo());

        $this->importEachType('ctdt', new KhoiKienThucImportInfo());

        $this->importEachType('sinh-vien', new SinhVienImportInfo());


        return $this->res;
        // return Excel::download(new ExportExtelFromCollection(HocPhan::class), 'test.xlsx');
    }



    function importEachType($inputKey, $info){
        //Check valid input

        if (!isset($this->input[$inputKey]))
            return;
        $input = json_decode($this->input[$inputKey]);
        if ($input == null){
            $this->res[$inputKey]['success'] = false;
            $this->res[$inputKey]['msg'] = 'value input không phù hợp';
            return ;
        }


        $this->res[$inputKey] = [];

        if($input != null){
            foreach($input as $index=>$importInfo){
                $this->res[$inputKey][$index] = [
                    'success' => false,
                    'msg' => []
                ];

                if (!isset($importInfo->header)){
                    // $this->res[$inputKey][$index]['header'] = false;
                    array_push($this->res[$inputKey][$index]['msg'], 'không tìm thấy value header');
                }

                if (!isset($importInfo->sheets)){
                    // $this->res[$inputKey][$index]['sheets'] = false;
                    array_push($this->res[$inputKey][$index]['msg'], 'không tìm thấy value sheets');

                }
                if (!isset($importInfo->file)){
                    // $this->res[$inputKey][$index]['file'] = false;
                    array_push($this->res[$inputKey][$index]['msg'], 'không tìm thấy value file');

                }

                if (count($this->res[$inputKey][$index]['msg']) != 0) continue;
                $rs = $this->import(
                    $importInfo->header,
                    $importInfo->sheets,
                    $info,
                    $this->files[$importInfo->file],
                    $info->getImportClass($info->type)
                );

                $this->res[$inputKey][$index]['success'] = !$rs['err'];
                $this->res[$inputKey][$index]['msg'] = $rs['res'];
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
                                $info->RowToData());
            // ##
            // dd(Excel::toArray($importer, $file));

            $importer->import($file);

            if ($importer->failures() != null)
            foreach ($importer->failures() as $fail){
                array_push($failures, [
                    $fail->row(), // row that went wrong
                    // $fail->attribute(), // either heading key (if using heading row concern) or column index
                    $fail->errors(), // Actual error resages from Laravel validator
                    $fail->values()[$fail->attribute()]
                ]);
            }
        }
        catch (Exception $e){
            return [
                'err' => true,
                'res' => $e->getMessage()
            ];
        }
        return [
            'err' => false,
            // 'res' => $failures
            'res' => []
        ];

    }

    function export(){
        return new ExportExcelFromModel(
            HocPhan::class,
            []
        );
    }

    function info(Request $request){

        $info = TaiKhoan::where('id', $request->user()->id)->first();
        $data = [];
        switch ($info->quyen_id){
            case 1:
                $data = [
                    'Thông tin cá nhân' => [
                        0 => 2,
                        'Mã số sinh viên:' => $info->ten_dang_nhap,
                        'Họ và tên:' => $info->ten,
                        'Ngày sinh' => $info->ngay_sinh,
                        'Email' => $info->email,
                    ],
                    // 'Ly do ...' => [
                    //     1,
                    //     "Thieu tieng anh",
                    //     'Cac hoc phan chua hoan thanh'
                    // ]
                ];
                break;
            case 2:
                $data = [
                    'Thông tin cá nhân' => [
                        0 => 2,
                        'Mã số giảng viên:' => $info->ten_dang_nhap,
                        'Họ và tên:' => $info->ten,
                        'Ngày sinh' => $info->ngay_sinh,
                        'Email' => $info->email,
                    ],
                    // 'Ly do ...' => [
                    //     1,
                    //     "Thieu tieng anh",
                    //     'Cac hoc phan chua hoan thanh'
                    // ]
                ];
                break;
            case 4:
                $data = [
                    'Thông tin cá nhân' => [
                        0 => 2,
                        'Tên đăng nhập:' => $info->ten_dang_nhap,
                        'Họ và tên:' => $info->ten,
                        'Ngày sinh' => $info->ngay_sinh,
                        'Email' => $info->email,
                    ],
                    // 'Ly do ...' => [
                    //     1,
                    //     "Thieu tieng anh",
                    //     'Cac hoc phan chua hoan thanh'
                    // ]
                ];
                break;

        }

        return $this->success($data);
    }




}
