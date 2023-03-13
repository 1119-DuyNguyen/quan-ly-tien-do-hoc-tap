<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ThamGium
 * 
 * @property int $mssv
 * @property int $maLopHoc
 * 
 * @property SinhVien $sinh_vien
 * @property NhomHoc $nhom_hoc
 *
 * @package App\Models
 */
class ThamGia extends Model
{
	protected $table = 'tham_gia';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'mssv' => 'int',
		'maLopHoc' => 'int'
	];

	public function sinh_vien()
	{
		return $this->belongsTo(SinhVien::class, 'mssv');
	}

	public function nhom_hoc()
	{
		return $this->belongsTo(NhomHoc::class, 'maLopHoc');
	}
}
