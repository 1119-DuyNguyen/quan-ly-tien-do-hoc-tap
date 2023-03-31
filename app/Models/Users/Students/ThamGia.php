<?php

namespace App\Models\Users\Students;



use App\Models\Users\Classes\NhomHoc;
use App\Models\Authorization\TaiKhoan;
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

	public function sinh_vien()
	{
		return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
	}

	public function nhom_hoc()
	{
		return $this->belongsTo(NhomHoc::class);
	}
}
