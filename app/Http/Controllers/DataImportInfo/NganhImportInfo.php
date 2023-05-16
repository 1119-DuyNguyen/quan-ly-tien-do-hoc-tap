<?php

namespace App\Http\Controllers\DataImportInfo;

use App\Http\Controllers\Controller;
use App\Models\Khoa;
use App\Models\Nganh;

class NganhImportInfo extends ImportInfo
{
    public $type = 'row';

    public function RowToData(){
        return function ($row){
            return Nganh::updateOrCreate([
                'ma_nganh' => $row['ma_nganh'],
            ],[
                'ten' => $row['nganh'],
                'khoa_id' => Khoa::where('ma_khoa', $row['ma_khoa'])->first()->id
            ]);
        };
    }

    public function RowRules(){
        return [

        ];
    }
}
