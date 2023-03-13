<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NoiDungNhomHoc
 * 
 * @property int $tenND
 * @property int $loaiND
 * @property int $maND
 * @property int $chiTietND
 * @property int $maNhomHoc
 * 
 * @property NhomHoc $nhom_hoc
 *
 * @package App\Models
 */
class NoiDungNhomHoc extends Model
{
	protected $table = 'noi_dung_nhom_hoc';
	protected $primaryKey = 'maND';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'tenND' => 'int',
		'loaiND' => 'int',
		'maND' => 'int',
		'chiTietND' => 'int',
		'maNhomHoc' => 'int'
	];

	protected $fillable = [
		'tenND',
		'loaiND',
		'chiTietND',
		'maNhomHoc'
	];

	public function nhom_hoc()
	{
		return $this->belongsTo(NhomHoc::class, 'maNhomHoc');
	}
}
