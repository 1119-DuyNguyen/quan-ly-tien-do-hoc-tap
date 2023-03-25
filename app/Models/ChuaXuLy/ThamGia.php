<?php


namespace App\Models;

use App\Models\NhomHoc;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;


class ThamGia extends Model
{
	protected $table = 'tham_gia';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'nhom_hoc_id' => 'int',
		'sinh_vien_id' => 'int'
	];

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
	}

	public function nhom_hoc()
	{
		return $this->belongsTo(NhomHoc::class);
	}
}
