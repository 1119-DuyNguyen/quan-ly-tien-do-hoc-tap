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
                $row['nam_thu'],
                $row['hk_thu'],
                $row['so_lan_cb_lien_tiep'],
                $row['tong_so_lan_cb'],
                $row['dtbc_hk'],
                $row['dtbc_tl'],
                $row['kq'],
                $row['ghi_chu']
            ];
        };
    }



    public function RowRules(){
        return [
            'ma_sv' => 'required|int',
            'nam_thu' => 'required|int',
            'hk_thu' => 'required|int',
            'tong_so_lan_cb' => 'required|int',
            'dtbc_hk' => 'required|float',
            'dtbc_tl' => 'required|float',
            'kq' => 'required',
        ];
    }

}
