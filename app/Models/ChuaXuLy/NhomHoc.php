<?php


namespace App\Models;

use App\Models\BaiDang;
use App\Models\HocPhan;
use App\Models\ThamGia;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;


class NhomHoc extends Model
{
	protected $table = 'nhom_hoc';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'so_luong_sinh_vien' => 'int',
		'hoc_phan_id' => 'int',
		'giang_vien_id' => 'int',
		'create_at' => 'date'
	];

	protected $fillable = [
		'so_luong_sinh_vien',
		'stt_nhom',
		'nhom_thuc_hanh',
		'hoc_phan_id',
		'giang_vien_id',
		'create_at'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class);
	}

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'giang_vien_id');
	}

	public function bai_dangs()
	{
		return $this->hasMany(BaiDang::class);
	}

	public function tham_gia()
	{
		return $this->hasMany(ThamGia::class);
	}
}
