<?php

namespace App\Http\Controllers\DataImportInfo;
use App\Models\Authorization\Quyen;
use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\LopHoc;
class SinhVienImportInfo extends ImportInfo
{
    public $type = 'row';
    public function RowToData(){
        return function($row){
            TaiKhoan::firstOrNew([
                'ten_dang_nhap' => $row['ma_sinh_vien'],
            ],[
                'ten' => $row['ho_lot'].' '.$row['ten'],
                'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
                'quyen_id' => Quyen::where('ten', 'Sinh viên')->first()->id,
                'email' => $row['email'],
                'sdt' => $row['dt_lien_lac'],
                'ngay_sinh' => null,
                'khoa_id' => null,
            ]);

            LopHoc::firstOrNew([

            ]);

        };
    }



    public function firstOrNew($class, $find, $fill, $get){
        return $class::firstOrNew($find, $fill)->$get;
    }

    public function RowRules(){
        return [
            'ma_sinh_vien' => 'required|int',
        ];
    }

}
