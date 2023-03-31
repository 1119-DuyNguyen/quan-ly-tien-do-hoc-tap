<?php

namespace App\Models\Users\Staffs;


use App\Models\Khoa;
use App\Models\Authorization\TaiKhoan;

class NhanVien extends TaiKhoan
{
    public function khoa()
    {
        return $this->belongsTo(Khoa::class);
    }
}
