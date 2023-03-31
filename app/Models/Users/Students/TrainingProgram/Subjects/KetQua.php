<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;

use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;

class KetQua extends Model
{
    protected $table = 'ket_qua';
    public $incrementing = false;

    protected $casts = [
        'hoc_phan_id' => 'int',
        'sinh_vien_id' => 'int',
        'diem_qua_trinh' => 'float',
        'diem_cuoi_ky' => 'float',
        'diem_tong_ket' => 'float',
        'diem_he_4' => 'float',
        'qua_mon' => 'int',
        'bien_che_id' => 'int'
    ];


    protected $fillable = [
        'diem_qua_trinh',
        'diem_cuoi_ky',
        'diem_tong_ket',
        'diem_he_4',
        'loai_he_4',
        'qua_mon',
        'bien_che_id'
    ];

    public function bien_che()
    {
        return $this->belongsTo(BienChe::class);
    }
    public function hoc_phan()
    {
        return $this->belongsTo(HocPhan::class);
    }

    public function sinh_vien()
    {
        return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
    }
}
