<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Nganh
 * 
 * @property int $maNganh
 * @property int $tenNganh
 * @property int $maKhoa
 * 
 * @property Khoa $khoa
 * @property Collection|ChuongTrinhDaoTao[] $chuong_trinh_dao_taos
 * @property Collection|SinhVien[] $sinh_viens
 *
 * @package App\Models
 */
class Nganh extends Model
{
	protected $table = 'nganh';
	protected $primaryKey = 'maNganh';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maNganh' => 'int',
		'tenNganh' => 'int',
		'maKhoa' => 'int'
	];

	protected $fillable = [
		'tenNganh',
		'maKhoa'
	];

	public function khoa()
	{
		return $this->belongsTo(Khoa::class, 'maKhoa');
	}

	public function chuong_trinh_dao_taos()
	{
		return $this->hasMany(ChuongTrinhDaoTao::class, 'maNganh');
	}

	public function sinh_viens()
	{
		return $this->hasMany(SinhVien::class, 'maNganh');
	}
}
