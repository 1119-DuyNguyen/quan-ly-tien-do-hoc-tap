<?php

namespace App\Models\Users\Students;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Staffs\CoVanHocTap;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LopHoc extends Model
{
    use HasFactory;
    protected $table = 'lop_hoc';
    public $timestamps = false;

    protected $casts = [
        'co_van_hoc_tap_id' => 'int',
        'ma_lop' => 'int',
        'chuong_trinh_dao_tao_id' => 'int',
    ];



    protected $fillable = ['co_van_hoc_tap_id', 'ten_lop', 'ma_lop', 'chuong_trinh_dao_tao_id', 'thoi_gian_vao_hoc', 'thoi_gian_ket_thuc'];

    public function tai_khoan()
    {
        return $this->belongsTo(TaiKhoan::class, 'co_van_hoc_tap_id');
    }

    public function nien_khoa()
    {
        return $this->belongsTo(NienKhoa::class);
    }

    public function sinh_viens()
    {
        return $this->hasMany(TaiKhoan::class);
    }

    public function co_van_hoc_tap()
    {
        return $this->belongsTo(CoVanHocTap::class);
    }
}
