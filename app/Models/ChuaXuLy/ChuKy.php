<?php



namespace App\Models;

use Carbon\Carbon;
use App\Models\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;


class ChuKy extends Model
{
	protected $table = 'chu_ky';
	public $timestamps = false;

	protected $casts = [
		'nam_bat_dau' => 'date'
	];

	protected $fillable = [
		'nam_bat_dau',
		'nam_ket_thuc',
		'ten'
	];

	public function chuong_trinh_dao_taos()
	{
		return $this->hasMany(ChuongTrinhDaoTao::class);
	}
}
