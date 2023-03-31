<?php

namespace App\Models\Users\Students\Graduate;


use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\Graduate\ChungChi;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;

class ChuanDauRa extends Model
{
	protected $table = 'chuan_dau_ra';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'chung_chi_id' => 'int',
		'chuong_trinh_dao_tao_id' => 'int'
	];

	public function chung_chi()
	{
		return $this->belongsTo(ChungChi::class);
	}

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class);
	}
}
