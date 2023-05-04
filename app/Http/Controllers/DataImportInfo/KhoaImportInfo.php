<?php

namespace App\Http\Controllers\DataImportInfo;



class KhoaImportInfo extends ImportInfo
{
    public $type = 'row';
    public function RowToData(){
        return function($row){
            return TaiKhoan::firstOrNew([
                'ten_dang_nhap' => $row['ma_sinh_vien'],
            ],[
                'ten' => $row['ho_lot'].' '.$row['ten'],
                'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
                'quyen_id' => Quyen::where('ten', 'Sinh viên'),
                // 'khoa_id' => null,
                'lop_hoc_id' => LopHoc::firstOrNew([
                    'ma_lop' => $row['ma_lop']
                ],[
                    'ten_lop' => $row['ten_lop']
                ])
            ]);
        };
    }

    public function RowRules(){
        return [
            'ma_sinh_vien' => 'required|int',
        ];
    }
}
