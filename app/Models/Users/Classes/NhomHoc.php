<?php

namespace App\Models\Users\Classes;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Staffs\GiangVien;
use App\Models\Users\Students\ThamGia;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class NhomHoc extends Model
{
    use HasFactory;
    protected $table = 'nhom_hoc';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'id' => 'int',
        'so_luong_sinh_vien' => 'int',
        'hoc_phan_id' => 'int',
        'giang_vien_id' => 'int',
        'create_at' => 'date',
    ];

    protected $fillable = [
        'so_luong_sinh_vien',
        'stt_nhom',
        'nhom_thuc_hanh',
        'hoc_phan_id',
        'giang_vien_id',
        'create_at',
    ];

    public function hoc_phan()
    {
        return $this->belongsTo(HocPhan::class);
    }

    public function tai_khoan()
    {
        return $this->belongsTo(TaiKhoan::class, 'giang_vien_id');
    }

    public function bai_dangs()
    {
        return $this->hasMany(BaiDang::class);
    }

    public function tham_gia()
    {
        return $this->hasMany(ThamGia::class);
    }

    public function giang_vien()
    {
        return $this->belongsTo(GiangVien::class);
    }
}