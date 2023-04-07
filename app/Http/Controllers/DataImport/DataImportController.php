<?php

namespace App\Http\Controllers\DataImport;

use App\Http\Requests\DataImportRequest;
use App\Imports\ImportExcel;
use Exception;
use App\Http\Controllers\ApiController;

class DataImportController extends ApiController
{
    protected $header_row;
    protected $start_row;
    protected $rules;
    protected $inputKey;

    function __invoke(DataImportRequest $request){
        return [
            [
                'files' => 0,
                'sheets' => [
                    [
                        'name' => 'HP-GV',
                        'header-row' => 4
                    ]
                ]
            ]
        ];

        // $request->validated();

        $mess = [];
        $fileUpload = $request->file('files');
        $input = json_decode($request->input($this->inputKey));

        //Import Giang Vien
        if($input != null){
            foreach($input as $importInfo){
                array_push($mess,$this
                ->import(
                    $this->RowToModel(),
                    $fileUpload[$importInfo->file],
                    $importInfo->sheets,
                    $this->RowRules(),
                    ImportExcel::class));
            }
        }
        return $mess;
    }

    function RowRules(){

    }

    function RowToModel(){

    }

    function import($model, $file_name, $sheetNames, $rules, $class){
        $failures = [];
        try {
            $importer = new $class(
                                $model,
                                $this->header_row,
                                $sheetNames,
                                $rules);
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

}
