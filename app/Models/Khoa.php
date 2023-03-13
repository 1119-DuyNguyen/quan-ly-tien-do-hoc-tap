<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Khoa
 * 
 * @property int $maKhoa
 * @property int $tenKhoa
 * 
 * @property Collection|CanBo[] $can_bos
 * @property Collection|Nganh[] $nganhs
 * @property Collection|SinhVien[] $sinh_viens
 *
 * @package App\Models
 */
class Khoa extends Model
{
	protected $table = 'khoa';
	protected $primaryKey = 'maKhoa';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maKhoa' => 'int',
		'tenKhoa' => 'int'
	];

	protected $fillable = [
		'tenKhoa'
	];

	public function can_bos()
	{
		return $this->belongsToMany(CanBo::class, 'can_bo_khoa', 'maKhoa', 'maCB');
	}

	public function nganhs()
	{
		return $this->hasMany(Nganh::class, 'maKhoa');
	}

	public function sinh_viens()
	{
		return $this->hasMany(SinhVien::class, 'maKhoa');
	}
}
