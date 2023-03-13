<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CanBoKhoa
 * 
 * @property int $maKhoa
 * @property int $maCB
 * 
 * @property Khoa $khoa
 * @property CanBo $can_bo
 *
 * @package App\Models
 */
class CanBoKhoa extends Model
{
	protected $table = 'can_bo_khoa';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maKhoa' => 'int',
		'maCB' => 'int'
	];

	public function khoa()
	{
		return $this->belongsTo(Khoa::class, 'maKhoa');
	}

	public function can_bo()
	{
		return $this->belongsTo(CanBo::class, 'maCB');
	}
}
