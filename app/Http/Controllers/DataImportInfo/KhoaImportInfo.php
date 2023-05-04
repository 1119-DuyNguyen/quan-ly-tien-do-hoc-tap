<?php

namespace App\Http\Controllers\DataImportInfo;
use App\Models\Khoa;



class KhoaImportInfo extends ImportInfo
{
    public $type = 'row';
    public function RowToData(){
        return function($row){
            return Khoa::updateOrCreate([
                'ma_khoa' => $row['ma_khoa'],
                'ten' => $row['ten_khoa']
            ]);
        };
    }

    public function RowRules(){
        return [
            'ma_khoa' => 'required',
            'ten_khoa' => 'required'
        ];
    }
}
