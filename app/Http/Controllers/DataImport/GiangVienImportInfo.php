<?php

namespace App\Http\Controllers\DataImport;


use App\Models\Authorization\TaiKhoan;
use App\Models\Khoa;
use App\Models\Authorization\Quyen;
use Str;
class GiangVienImportInfo extends ImportInfo
{
    // public $inputKey = "giang-vien";
    public function RowToModel(){
        return function ($row){
            return new TaiKhoan(
                [
                    'ten' => $row['tengv'],
                    'ten_dang_nhap' => $row['macb'],
                    //123456
                    'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
                    'remember_token' => Str::random(10),
                    'khoa_id' => Khoa::where('ten','Công nghệ thông tin')->first()->id,
                    // 'lop_hoc_id' => fake()->randomNumber(),
                    'lop_hoc_id' => null,
                    'quyen_id' => Quyen::where('ten', 'Giảng viên')->first()->id
                ]
            );
        };
    }

    public function RowRules(){
        return [
            'tengv' => 'required',
            'macb' => 'required|int|unique:App\Models\Authorization\TaiKhoan,ten_dang_nhap'
        ];
    }

}
