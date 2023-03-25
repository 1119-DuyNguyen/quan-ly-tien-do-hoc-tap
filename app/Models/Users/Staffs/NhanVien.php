<?php

namespace App\Models\Users\Staffs;

use App\Models\Khoa;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NhanVien extends TaiKhoan
{
    use HasFactory;
    public function khoa()
    {
        return $this->belongsTo(Khoa::class);
    }
}
