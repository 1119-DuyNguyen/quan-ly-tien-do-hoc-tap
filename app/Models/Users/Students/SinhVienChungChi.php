<?php

namespace App\Models\Users\Students;


use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\Graduate\ChungChi;

class SinhVienChungChi extends Model
{
    protected $table = 'sinh_vien_chung_chi';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'chung_chi_id' => 'int',
        'sinh_vien_id' => 'int',
    ];

    public function sinh_vien()
    {
        return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
    }

    public function chung_chi()
    {
        return $this->belongsTo(ChungChi::class);
    }
}
