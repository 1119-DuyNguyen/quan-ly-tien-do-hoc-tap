<?php

namespace App\Models\Users\Staffs;


use App\Models\Users\Staffs\NhanVien;
use App\Models\Users\Students\LopHoc;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoVanHocTap extends NhanVien
{

    public function lop_hocs()
    {
        return $this->hasMany(LopHoc::class, 'co_van_hoc_tap_id');
    }
}
