<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class YeuCau
 * 
 * @property int $maCTDT
 * @property int $maCC
 * 
 * @property ChuongTrinhDaoTao $chuong_trinh_dao_tao
 * @property ChungChi $chung_chi
 *
 * @package App\Models
 */
class YeuCau extends Model
{
	protected $table = 'yeu_cau';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maCTDT' => 'int',
		'maCC' => 'int'
	];

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class, 'maCTDT');
	}

	public function chung_chi()
	{
		return $this->belongsTo(ChungChi::class, 'maCC');
	}
}
