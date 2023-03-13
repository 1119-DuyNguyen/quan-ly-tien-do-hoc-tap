<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SinhVien
 * 
 * @property int $mssv
 * @property int $hoTen
 * @property int $soTCPhaiHocLai
 * @property int $tongTCDaHoc
 * @property int $maNganh
 * @property int $maNienKhoa
 * @property int $maKhoa
 * 
 * @property Nganh $nganh
 * @property NienKhoa $nien_khoa
 * @property Khoa $khoa
 * @property Collection|ChungChi[] $chung_chis
 * @property Collection|KetQua[] $ket_quas
 * @property Collection|ThamGia[] $tham_gia
 *
 * @package App\Models
 */
class SinhVien extends Model
{
	protected $table = 'sinh_vien';
	protected $primaryKey = 'mssv';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'mssv' => 'int',
		'hoTen' => 'int',
		'soTCPhaiHocLai' => 'int',
		'tongTCDaHoc' => 'int',
		'maNganh' => 'int',
		'maNienKhoa' => 'int',
		'maKhoa' => 'int'
	];

	protected $fillable = [
		'hoTen',
		'soTCPhaiHocLai',
		'tongTCDaHoc',
		'maNganh',
		'maNienKhoa',
		'maKhoa'
	];

	public function nganh()
	{
		return $this->belongsTo(Nganh::class, 'maNganh');
	}

	public function nien_khoa()
	{
		return $this->belongsTo(NienKhoa::class, 'maNienKhoa');
	}

	public function khoa()
	{
		return $this->belongsTo(Khoa::class, 'maKhoa');
	}

	public function chung_chis()
	{
		return $this->hasMany(ChungChi::class, 'mssv');
	}

	public function ket_quas()
	{
		return $this->hasMany(KetQua::class, 'mssv');
	}

	public function tham_gia()
	{
		return $this->hasMany(ThamGia::class, 'mssv');
	}
}
