<?php

namespace App\Http\Controllers\DataImport;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
// use App\Http\Controllers\DataImport\ImportInfo;
class HocPhanImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function ImportType():int{
        return 0;
    }
    public function RowToData(){
        return function ($row){
            $model = HocPhan::where('id', $row['mahp'])->first();
            // dd($model);
            if ($model == null){
                return $this->toModel(new HocPhan(), $row);
            }else {
                return $this->toModel($model, $row);
            }

        };
    }

    public function toModel($model, $row){
        // dd($row);
        $model->id = $row['mahp'];
        $model->ten = $row['tenhp'];
        $model->so_tin_chi = $row['so_tin_chi'];
        $model->phan_tram_giua_ki = $row['he_so_giua_ki'];
        $model->phan_tram_cuoi_ki = $row['he_so_cuoi_ki'];
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
