<?php



namespace App\Models;

use App\Models\Khoa;
use App\Models\ChuKy;
use App\Models\NienKhoa;
use App\Models\HocKyGoiY;
use App\Models\ChuanDauRa;
use App\Models\KhoiKienThuc;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;


class ChuongTrinhDaoTao extends Model
{
	protected $table = 'chuong_trinh_dao_tao';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'tong_tin_chi' => 'int',
		'thoi_gian_dao_tao' => 'float',
		'ctdt_cha_id' => 'int',
		'chu_ky_id' => 'int',
		'khoa_id' => 'int'
	];

	protected $fillable = [
		'ten',
		'tong_tin_chi',
		'thoi_gian_dao_tao',
		'ctdt_cha_id',
		'chu_ky_id',
		'khoa_id',
		'trinh_do_dao_tao'
	];

	public function chu_ky()
	{
		return $this->belongsTo(ChuKy::class);
	}

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class, 'ctdt_cha_id');
	}

	public function khoa()
	{
		return $this->belongsTo(Khoa::class);
	}

	public function chuan_dau_ras()
	{
		return $this->hasMany(ChuanDauRa::class);
	}

	public function chuong_trinh_dao_taos()
	{
		return $this->hasMany(ChuongTrinhDaoTao::class, 'ctdt_cha_id');
	}

	public function hoc_ky_goi_ys()
	{
		return $this->hasMany(HocKyGoiY::class);
	}

	public function khoi_kien_thucs()
	{
		return $this->belongsToMany(KhoiKienThuc::class, 'khoi_kien_thuc_chuong_trinh_dao_tao');
	}

	public function nien_khoas()
	{
		return $this->hasMany(NienKhoa::class);
	}
}
