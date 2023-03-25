<?php



namespace App\Models;

use App\Models\ChungChi;
use App\Models\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Model;

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
