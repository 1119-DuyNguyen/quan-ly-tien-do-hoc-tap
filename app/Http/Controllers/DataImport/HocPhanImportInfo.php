<?php

namespace App\Http\Controllers\DataImport;

use App\Models\Usemodel\Students\TrainingProgram\Subjects\HocPhan;
// use App\Http\Controllers\DataImport\ImportInfo;
class HocPhanImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function RowToModel(){
        return function ($row){
            $model = HocPhan::where('id', $row['mahp'])->first();
            dd($model);
            if ($model == null){
                return $this->toModel(new HocPhan(), $row);
                // return new HocPhan(
                //     [
                //         'ma_hoc_phan' => $row['mahp'],
                //         'ten' => $row['tenhp'],
                //         'so_tin_chi' => $row['so_tin_chi'],
                //         'phan_tram_giua_ki' => 0,
                //         'phan_tram_cuoi_ki' => 0,
                //     ]
                // );

            }else {
                return $this->toModel($model, $row);
            }

        };
    }

    public function toModel($model, $row){
        $model->id = $row['mahp'];
        $model->ten = $row['tenhp'];
        $model->so_tin_chi = $row['so_tin_chi'];
        $model->phan_tram_giua_ki = $row['he_so_giua_ky'];
        $model->phan_tram_cuoi_ki = $row['he_so_cuoi_ky'];
        $model->save();
        return $model;
    }

    public function RowRules(){
        return [
            'mahp' => 'required|int',
            'tenhp' => 'required',
            'so_tin_chi' => 'int'
        ];
    }

}
