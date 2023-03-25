<?php

namespace App\Models\Users;

use App\Models\KetQua;
use App\Models\LopHoc;
use App\Models\ThamGia;
use App\Models\Users\TaiKhoan;
use App\Models\SinhVienChungChi;
use App\Models\TinhTrangSinhVien;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SinhVien extends TaiKhoan
{
    use HasFactory;

    // public function sinh_vien_chung_chis()
    // {
    //     return $this->hasMany(SinhVienChungChi::class, 'sinh_vien_id');
    // }
    // public function tinh_trang_sinh_viens()
    // {
    //     return $this->hasMany(TinhTrangSinhVien::class, 'nguoi_dung_id');
    // }

    // public function tham_gia()
    // {
    //     return $this->hasMany(ThamGia::class, 'sinh_vien_id');
    // }
    // public function ket_quas()
    // {
    //     return $this->hasMany(KetQua::class, 'sinh_vien_id');
    // }
    // public function lop_hoc()
    // {
    //     return $this->belongsTo(LopHoc::class);
    // }
}
