<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ChuongTrinhDaoTaoHocPhan
 * 
 * @property int $HKKhuyenNghi
 * @property int $maCTDT
 * @property int $maHP
 * 
 * @property ChuongTrinhDaoTao $chuong_trinh_dao_tao
 * @property HocPhan $hoc_phan
 *
 * @package App\Models
 */
class ChuongTrinhDaoTaoHocPhan extends Model
{
	protected $table = 'chuong_trinh_dao_tao_hoc_phan';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'HKKhuyenNghi' => 'int',
		'maCTDT' => 'int',
		'maHP' => 'int'
	];

	protected $fillable = [
		'HKKhuyenNghi'
	];

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class, 'maCTDT');
	}

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class, 'maHP');
	}
}
