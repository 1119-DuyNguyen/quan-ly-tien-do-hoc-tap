<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NienKhoa
 * 
 * @property int $batDau
 * @property int $maNienKhoa
 * @property int $ketThucDuKien
 * 
 * @property Collection|SinhVien[] $sinh_viens
 *
 * @package App\Models
 */
class NienKhoa extends Model
{
	protected $table = 'nien_khoa';
	protected $primaryKey = 'maNienKhoa';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'batDau' => 'int',
		'maNienKhoa' => 'int',
		'ketThucDuKien' => 'int'
	];

	protected $fillable = [
		'batDau',
		'ketThucDuKien'
	];

	public function sinh_viens()
	{
		return $this->hasMany(SinhVien::class, 'maNienKhoa');
	}
}
