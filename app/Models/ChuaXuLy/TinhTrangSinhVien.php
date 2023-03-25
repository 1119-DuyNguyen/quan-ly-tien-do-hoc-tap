<?php

namespace App\Models;

use App\Models\MocThoiGian;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;

class TinhTrangSinhVien extends Model
{
	protected $table = 'tinh_trang_sinh_vien';
	public $timestamps = false;

	protected $casts = [
		'nguoi_dung_id' => 'int',
		'so_lan_canh_cao' => 'int',
		'da_tot_nghiep' => 'int',
		'moc_thoi_gian_id' => 'int'
	];

	protected $fillable = [
		'nguoi_dung_id',
		'so_lan_canh_cao',
		'da_tot_nghiep',
		'moc_thoi_gian_id',
		'buoc_thoi_hoc'
	];

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'nguoi_dung_id');
	}

	public function moc_thoi_gian()
	{
		return $this->belongsTo(MocThoiGian::class);
	}
}
