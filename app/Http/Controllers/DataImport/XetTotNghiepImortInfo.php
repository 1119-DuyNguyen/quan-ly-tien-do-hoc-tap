<?php

namespace App\Http\Controllers\DataImport;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
// use App\Http\Controllers\DataImport\ImportInfo;
class ThoiHocImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function ImportType():int{
        return 0;
    }
    public function RowToData(){
        return function ($row){
            return [
                $row['ma_sv'],
                $row['tc_tl'],
                $row['dtbtn'],
                $row['xep_loai']
            ];
        };
    }



    public function RowRules(){
        return [
            'ma_sv' => 'required|int',
            'tc_tl' => 'required|int',
            'dtbtn' => 'required|float',
        ];
    }

}
