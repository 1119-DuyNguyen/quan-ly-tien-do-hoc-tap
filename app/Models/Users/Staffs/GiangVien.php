<?php

namespace App\Models\Users\Staffs;

use App\Models\NhomHoc;
use App\Models\Users\Staffs\NhanVien;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class GiangVien extends NhanVien
{
    use HasFactory;
    // public function nhom_hocs()
    // {
    //     return $this->hasMany(NhomHoc::class, 'giang_vien_id');
    // }
}
