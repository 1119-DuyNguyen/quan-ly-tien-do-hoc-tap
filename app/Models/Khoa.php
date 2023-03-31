<?php

namespace App\Models;


use App\Models\Nganh;
use App\Models\Authorization\TaiKhoan;

use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Khoa extends Model
{
    protected $table = 'khoa';
    public $timestamps = true;
    use HasFactory;
    protected $fillable = ['ma_khoa', 'ten'];

    public function chuong_trinh_dao_taos()
    {
        return $this->hasMany(ChuongTrinhDaoTao::class);
    }

    public function khoi_kien_thucs()
    {
        return $this->hasMany(KhoiKienThuc::class);
    }

    public function nganhs()
    {
        return $this->hasMany(Nganh::class);
    }
}
