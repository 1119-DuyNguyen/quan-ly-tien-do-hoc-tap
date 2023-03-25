<?php


namespace App\Models;

use App\Models\NienKhoa;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;


class LopHoc extends Model
{
	protected $table = 'lop_hoc';
	public $timestamps = false;

	protected $casts = [
		'nien_khoa_id' => 'int',
		'co_van_hoc_tap_id' => 'int'
	];

	protected $fillable = [
		'nien_khoa_id',
		'co_van_hoc_tap_id',
		'ten_lop',
		'ma_lop'
	];

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'co_van_hoc_tap_id');
	}

	public function nien_khoa()
	{
		return $this->belongsTo(NienKhoa::class);
	}

	public function tai_khoans()
	{
		return $this->hasMany(TaiKhoan::class);
	}
}
