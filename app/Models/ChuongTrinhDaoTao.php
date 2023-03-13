<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ChuongTrinhDaoTao
 * 
 * @property int $maCTDT
 * @property int $tenCTDT
 * @property int $batDau
 * @property int $ketThuc
 * @property int $tongTC
 * @property int $thoiGian
 * @property int $maNganh
 * 
 * @property Nganh $nganh
 * @property Collection|HocPhan[] $hoc_phans
 * @property Collection|YeuCau[] $yeu_caus
 *
 * @package App\Models
 */
class ChuongTrinhDaoTao extends Model
{
	protected $table = 'chuong_trinh_dao_tao';
	protected $primaryKey = 'maCTDT';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maCTDT' => 'int',
		'tenCTDT' => 'int',
		'batDau' => 'int',
		'ketThuc' => 'int',
		'tongTC' => 'int',
		'thoiGian' => 'int',
		'maNganh' => 'int'
	];

	protected $fillable = [
		'tenCTDT',
		'batDau',
		'ketThuc',
		'tongTC',
		'thoiGian',
		'maNganh'
	];

	public function nganh()
	{
		return $this->belongsTo(Nganh::class, 'maNganh');
	}

	public function hoc_phans()
	{
		return $this->belongsToMany(HocPhan::class, 'chuong_trinh_dao_tao_hoc_phan', 'maCTDT', 'maHP')
					->withPivot('HKKhuyenNghi');
	}

	public function yeu_caus()
	{
		return $this->hasMany(YeuCau::class, 'maCTDT');
	}
}
