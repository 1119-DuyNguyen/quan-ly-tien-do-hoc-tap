<?php

namespace App\Models\Users\Classes\Posts;


use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\FileBinhLuan;

class BinhLuan extends Model
{
    protected $table = 'binh_luan';
    public $timestamps = false;

    protected $casts = [
        'create_at' => 'date',
        'bai_dang_id' => 'int',
        'nguoi_dung_id' => 'int',
        'binh_luan_id' => 'int',
    ];

    protected $fillable = ['noi_dung', 'create_at', 'bai_dang_id', 'nguoi_dung_id', 'binh_luan_id', 'path_enumeration'];

    public function binh_luan()
    {
        return $this->belongsTo(BinhLuan::class);
    }

    public function tai_khoan()
    {
        return $this->belongsTo(TaiKhoan::class, 'nguoi_dung_id');
    }

    public function bai_dang()
    {
        return $this->belongsTo(BaiDang::class);
    }

    public function binh_luans()
    {
        return $this->hasMany(BinhLuan::class);
    }

    public function file_binh_luans()
    {
        return $this->hasMany(FileBinhLuan::class);
    }
}
