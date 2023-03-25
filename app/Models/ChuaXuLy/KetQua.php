<?php


namespace App\Models;


use App\Models\HocPhan;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;

class KetQua extends Model
{
	protected $table = 'ket_qua';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'hoc_phan_id' => 'int',
		'sinh_vien_id' => 'int',
		'diem_qua_trinh' => 'float',
		'diem_cuoi_ky' => 'float',
		'diem_tong_ket' => 'float',
		'create_at' => 'date',
		'diem_he_4' => 'float',
		'qua_mon' => 'int'
	];

	protected $fillable = [
		'diem_qua_trinh',
		'diem_cuoi_ky',
		'diem_tong_ket',
		'create_at',
		'diem_he_4',
		'loai_he_4',
		'qua_mon'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class);
	}

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
	}
}
