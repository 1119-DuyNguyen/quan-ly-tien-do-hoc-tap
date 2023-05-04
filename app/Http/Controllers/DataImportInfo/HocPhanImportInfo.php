<?php

namespace App\Http\Controllers\DataImportInfo;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
// use App\Http\Controllers\DataImport\ImportInfo;
class HocPhanImportInfo extends ImportInfo
{
    public $type = 'row';

    public function RowToData(){
        return function ($row){
            return HocPhan::updateOrCreate([
                'ma_hoc_phan' => $row['mahp']
            ],[
                'ten' => $row['tenhp'],
                'so_tin_chi' => $row['so_tin_chi'],
                'phan_tram_giua_ki' => $row['he_so_giua_ki'],
                'phan_tram_cuoi_ki' => $row['he_so_cuoi_ki'],
                'co_tinh_tich_luy' => intval($row['tich_luy'])
            ]);

        };
    }

    public function RowRules(){
        return [
            'mahp' => 'required|int',
            'tenhp' => 'required',
            'so_tin_chi' => 'int',
            'he_so_giua_ki' => 'int',
            'he_so_cuoi_ki' => 'int',
            'tich_luy' => 'int'
        ];
    }

}
