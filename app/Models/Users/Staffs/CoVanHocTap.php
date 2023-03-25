<?php

namespace App\Models\Users\Staffs;

use App\Models\LopHoc;
use App\Models\Users\Staffs\NhanVien;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class CoVanHocTap extends NhanVien
{
    use HasFactory;
    // public function lop_hocs()
    // {
    //     return $this->hasMany(LopHoc::class, 'co_van_hoc_tap_id');
    // }
}
