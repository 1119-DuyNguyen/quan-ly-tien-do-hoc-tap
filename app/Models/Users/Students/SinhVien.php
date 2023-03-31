<?php

namespace App\Models\Users\Students;



use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SinhVien extends TaiKhoan
{
    protected $table = 'tai_khoan';

    public function sinh_vien_chung_chis()
    {
        return $this->hasMany(SinhVienChungChi::class, 'sinh_vien_id');
    }
    public function tham_gia()
    {
        return $this->hasMany(ThamGia::class, 'sinh_vien_id');
    }
    public function ket_quas()
    {
        return $this->hasMany(KetQua::class, 'sinh_vien_id');
    }
    public function lop_hoc()
    {
        return $this->belongsTo(LopHoc::class);
    }
    public function tinh_trang_sinh_vien()
    {
        return $this->hasOne(TinhTrangSinhVien::class, 'sinh_vien_id');
    }
}
