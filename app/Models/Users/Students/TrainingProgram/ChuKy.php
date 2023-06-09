<?php



namespace App\Models\Users\Students\TrainingProgram;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChuKy extends Model
{
	use HasFactory;
	protected $table = 'chu_ky';
	public $timestamps = false;

	protected $casts = [];

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
