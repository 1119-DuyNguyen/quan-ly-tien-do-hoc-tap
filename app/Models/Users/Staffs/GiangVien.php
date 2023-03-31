<?php

namespace App\Models\Users\Staffs;



use App\Models\Users\Classes\NhomHoc;
use App\Models\Users\Staffs\NhanVien;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GiangVien extends NhanVien
{

    public function nhom_hocs()
    {
        return $this->hasMany(NhomHoc::class, 'giang_vien_id');
    }
}
