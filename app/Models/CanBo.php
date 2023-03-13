<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CanBo
 * 
 * @property int $maCB
 * @property int $hoTenCB
 * @property int $quyenHan
 * 
 * @property Collection|Khoa[] $khoas
 * @property Collection|NhomHoc[] $nhom_hocs
 *
 * @package App\Models
 */
class CanBo extends Model
{
	protected $table = 'can_bo';
	protected $primaryKey = 'maCB';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maCB' => 'int',
		'hoTenCB' => 'int',
		'quyenHan' => 'int'
	];

	protected $fillable = [
		'hoTenCB',
		'quyenHan'
	];

	public function khoas()
	{
		return $this->belongsToMany(Khoa::class, 'can_bo_khoa', 'maCB', 'maKhoa');
	}

	public function nhom_hocs()
	{
		return $this->hasMany(NhomHoc::class, 'maCB');
	}
}
