<?php

namespace App\Models\Users\Classes\Posts;

use App\Models\Users\Classes\NhomHoc;
use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Classes\Posts\BinhLuan;
use App\Models\Users\Classes\Posts\FileBaiDang;

class BaiTapSinhVien extends Model
{
    protected $table = 'bai_tap_sinh_vien';
    public $timestamps = false;

    protected $casts = [
        'bai_tap_id' => 'int',
        'sinh_vien_id' => 'int',
        'diem' => 'int',
    ];

    protected $fillable = ['bai_tap_id', 'sinh_vien_id', 'create_at', 'diem'];

    public function tai_khoan()
    {
        return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
    }

    public function bai_dangs()
    {
        return $this->belongsTo(BaiDang::class);
    }
}