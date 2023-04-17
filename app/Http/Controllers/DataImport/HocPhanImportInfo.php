<?php

namespace App\Http\Controllers\DataImport;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
class HocPhanImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function RowToModel(){
        return function ($row){
            return new HocPhan(
                [
                    'ma_hoc_phan' => $row['mahp'],
                    'ten' => $row['tenhp'],
                    'so_tin_chi' => $row['so_tin_chi'],
                    'phan_tram_giua_ki' => 0,
                    'phan_tram_cuoi_ki' => 0,
                ]
            );
        };
    }

    public function RowRules(){
        return [
            'mahp' => 'required|int|unique:App\Models\Users\Students\TrainingProgram\Subjects\HocPhan,ma_hoc_phan',
            'tenhp' => 'required',
            'so_tin_chi' => 'int'
        ];
    }

}
