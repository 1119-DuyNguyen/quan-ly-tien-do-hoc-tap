<?php

namespace App\Models\Users;

// use App\Models\BaiDang;
// use App\Models\BinhLuan;
use Laravel\Passport\hasApiTokens;


use App\Traits\AuthorizePermissions;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TaiKhoan extends Authenticatable
{
	protected $table = 'tai_khoan';
	public $timestamps = true;
	use HasFactory, Notifiable, hasApiTokens, AuthorizePermissions;
	protected $casts = [
		'create_at' => 'date',
		'khoa_id' => 'int',
		'lop_hoc_id' => 'int'
	];

	protected $fillable = [
		'ten',
		'ten_dang_nhap',
		'mat_khau',
		'khoa_id',
		'lop_hoc_id'
	];

	protected $hidden = [
		'remember_token',
		'mat_khau'
	];

	// public function bai_dangs()
	// {
	// 	return $this->hasMany(BaiDang::class, 'nguoi_dung_id');
	// }

	// public function binh_luans()
	// {
	// 	return $this->hasMany(BinhLuan::class, 'nguoi_dung_id');
	// }


}
