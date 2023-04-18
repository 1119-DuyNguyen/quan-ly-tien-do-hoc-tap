<?php

namespace App\Models\Authorization;

use App\Models\Users\Classes\Posts\BaiTapSinhVien;
use Laravel\Passport\hasApiTokens;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TaiKhoan extends Authenticatable
{
    protected $table = 'tai_khoan';
    use HasFactory, Notifiable, hasApiTokens;
    protected $casts = [
        'create_at' => 'date',
        'khoa_id' => 'int',
        'lop_hoc_id' => 'int',
    ];

    protected $fillable = ['ten', 'ten_dang_nhap', 'mat_khau', 'khoa_id', 'lop_hoc_id'];

    protected $hidden = ['remember_token', 'mat_khau'];

    // public function tinh_trang_sinh_viens()
    // {
    //     return $this->hasMany(TinhTrangSinhVien::class, 'nguoi_dung_id');
    // }

    // public function khoa()
    // {
    //     return $this->hasOne(Khoa::class, 'khoa_id');
    // }

    // public function lop_hoc()
    // {
    //     return $this->hasOne(LopHoc::class, 'lop_hoc_id');
    // }
    // public function lop_hocs()
    // {
    //     return $this->hasMany(LopHoc::class);
    // }

    // public function sinh_vien_chung_chis()
    // {
    //     return $this->hasMany(SinhVienChungChi::class);
    // }

    // public function ket_quas()
    // {
    //     return $this->hasMany(KetQua::class);
    // }

    // public function tham_gias()
    // {
    //     return $this->hasMany(ThamGia::class);
    // }

    // public function nhom_hocs()
    // {
    //     return $this->hasMany(NhomHoc::class);
    // }

    public function bai_dangs()
    {
        return $this->hasMany(BaiDang::class);
    }

    public function bai_tap_sinh_viens()
    {
        return $this->hasMany(BaiTapSinhVien::class);
    }

    public function binh_luans()
    {
        return $this->hasMany(BinhLuan::class);
    }

    public function quyen()
    {
        return $this->belongsTo(Quyen::class, 'quyen_id');
    }
    public function hasRole($role): bool
    {


        return $this->quyen()->where('ten', $role)->exists();
    }
    /**
     *  config passport
     *
     * @param string $username
     *
     * @return TaiKhoan
     */
    public function findForPassport(string $username): TaiKhoan
    {
        return $this->where('ten_dang_nhap', $username)->first();
    }
    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->mat_khau;
    }
}