<?php

namespace App\Models\Authorization;

use App\Models\Authorization\ChucNang;
use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quyen extends Model
{
    protected $table = 'quyen';
    public $timestamps = true;
    use HasFactory;
    protected $casts = [];

    protected $fillable = ['ten', 'ghi_chu'];

    public function nhomChucNang()
    {
        return $this->belongsToMany(ChucNang::class);
    }

    // public function tai_khoans()
    // {
    // 	//return $this->belongsToMany(Role::class, 'role_user');
    // 	return $this->belongsToMany(TaiKhoan::class);
    // }

    public function tai_khoans()
    {
        return $this->hasMany(TaiKhoan::class);
    }

    public function chuc_nang()
    {
        return $this->belongsToMany(ChucNang::class);
    }
}
