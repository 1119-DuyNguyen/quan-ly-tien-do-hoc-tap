<?php


namespace App\Models;

use App\Models\Nganh;
use App\Models\KhoiKienThuc;
use App\Models\Users\TaiKhoan;
use App\Models\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Khoa extends Model
{
	protected $table = 'khoa';
	public $timestamps = true;
	use HasFactory;
	protected $fillable = [
		'ma_khoa',
		'ten'
	];

	// public function chuong_trinh_dao_taos()
	// {
	// 	return $this->hasMany(ChuongTrinhDaoTao::class);
	// }

	// public function khoi_kien_thucs()
	// {
	// 	return $this->hasMany(KhoiKienThuc::class);
	// }

	// public function nganhs()
	// {
	// 	return $this->hasMany(Nganh::class);
	// }

	// public function tai_khoans()
	// {
	// 	return $this->hasMany(TaiKhoan::class);
	// }
}
