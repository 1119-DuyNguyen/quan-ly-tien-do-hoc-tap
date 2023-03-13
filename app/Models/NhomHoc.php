<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NhomHoc
 * 
 * @property int $maNhomHoc
 * @property int $tenNhomHoc
 * @property int $soLuongSV
 * @property int $maHP
 * @property int $maCB
 * 
 * @property HocPhan $hoc_phan
 * @property CanBo $can_bo
 * @property Collection|NoiDungNhomHoc[] $noi_dung_nhom_hocs
 * @property Collection|ThamGia[] $tham_gia
 *
 * @package App\Models
 */
class NhomHoc extends Model
{
	protected $table = 'nhom_hoc';
	protected $primaryKey = 'maNhomHoc';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maNhomHoc' => 'int',
		'tenNhomHoc' => 'int',
		'soLuongSV' => 'int',
		'maHP' => 'int',
		'maCB' => 'int'
	];

	protected $fillable = [
		'tenNhomHoc',
		'soLuongSV',
		'maHP',
		'maCB'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class, 'maHP');
	}

	public function can_bo()
	{
		return $this->belongsTo(CanBo::class, 'maCB');
	}

	public function noi_dung_nhom_hocs()
	{
		return $this->hasMany(NoiDungNhomHoc::class, 'maNhomHoc');
	}

	public function tham_gia()
	{
		return $this->hasMany(ThamGia::class, 'maLopHoc');
	}
}
