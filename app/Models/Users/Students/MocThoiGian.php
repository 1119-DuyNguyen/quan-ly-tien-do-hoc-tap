<?php

namespace App\Models\Users\Students;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TinhTrangSinhVien;



class MocThoiGian extends Model
{
    protected $table = 'moc_thoi_gian';
    public $timestamps = false;

    protected $casts = [
        'nam' => 'date',
        'dot' => 'int',
    ];

    protected $fillable = ['nam', 'dot', 'ten'];

    public function tinh_trang_sinh_viens()
    {
        return $this->hasMany(TinhTrangSinhVien::class);
    }
}
