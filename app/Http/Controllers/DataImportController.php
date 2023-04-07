<?php

namespace App\Http\Controllers;

use App\Imports\ImportExcel;
use App\Models\Authorization\TaiKhoan;
use Exception;
use Illuminate\Http\Request;

class DataImportController extends ApiController
{
    function __invoke(Request $request){
        //Request validate
        try {
            $request->validate($this->rules());
        }
        catch (Exception $e){
            return $this->error('Data request không đúng yêu cầu!', 500);
        }

        $inputGiangVien = json_decode($request->input('giang-vien'));
        $inputHocPhan = json_decode($request->input('hoc-phan'));


        $mess = [];

        $fileUpload = $request->file('files');

        //Import Giang Vien
        if($inputGiangVien != null){
            foreach($inputGiangVien as $infoImport){
                array_push($mess,$this
                ->import(
                    $this->RowToModelGiangVien(),
                    $fileUpload[$infoImport->file],
                    $infoImport->sheets,
                    $this->RowRulesGiangVien(),
                    ImportExcel::class));
            }
        }
        return $mess;
    }



    function import($model, $file_name, $sheetNames, $rules, $class){
        $mess = [];
        $err = false;
        $failures = [];

        try {
            $HeaderRow = 4;
            $StartRow = 0;
            $Rules = [];
            $importer = new $class($model, $HeaderRow, $sheetNames, $rules);
            // dd($importer->sheets());
            $importer->import($file_name);
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

    function rules(){
        return [
            // 'files' => 'required',
            // 'files.*' => 'required|mimes:xlx,xlsx,csv'
        ];
    }

}
