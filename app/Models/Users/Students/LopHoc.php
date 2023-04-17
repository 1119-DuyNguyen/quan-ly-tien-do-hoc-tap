<?php

namespace App\Models\Users\Students;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Staffs\CoVanHocTap;

class LopHoc extends Model
{
    protected $table = 'lop_hoc';
    public $timestamps = false;

    protected $casts = [
        'nien_khoa_id' => 'int',
        'co_van_hoc_tap_id' => 'int',
    ];

    protected $fillable = ['nien_khoa_id', 'co_van_hoc_tap_id', 'ten_lop', 'ma_lop'];

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
