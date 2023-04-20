<?php

namespace App\Http\Controllers\DataImport;


class KhoiKienThucImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function RowToModel(){
        return function ($row){



        };
    }

    public function toModel($model, $row){
        // dd($row);

        $model->save();
        return $model;
    }

    public function RowRules(){
        return [

        ];
    }

}
