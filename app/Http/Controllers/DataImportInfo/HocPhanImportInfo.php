<?php

namespace App\Http\Controllers\DataImportInfo;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
// use App\Http\Controllers\DataImport\ImportInfo;
class HocPhanImportInfo extends ImportInfo
{
    public $type = 'row';

    public function RowToData(){
        return function ($row){
            return HocPhan::updateOrNew([
                'ma_hoc_phan' => $row['mahp']
            ],[
                'ten' => $row['tenhp'],
                'so_tin_chi' => $row['so_tin_chi'],
                'phan_tram_giua_ki' => $row['phan_tram_giua_ki'],
                'phan_tram_cuoi_ki' => $row['phan_tram_cuoi_ki'],
            ]);

        };
    }

    public function RowRules(){
        return [
            'mahp' => 'required|int',
            'tenhp' => 'required',
            'so_tin_chi' => 'int'
        ];
    }

}
