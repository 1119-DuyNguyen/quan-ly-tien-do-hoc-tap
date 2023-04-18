<?php

namespace App\Models\Users\Students\TrainingProgram;

use App\Models\Khoa;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\Graduate\ChuanDauRa;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;


class ChuongTrinhDaoTao extends Model
{
	protected $table = 'chuong_trinh_dao_tao';


	protected $casts = [
		'tong_tin_chi' => 'int',
		'thoi_gian_dao_tao' => 'float',
		'chu_ky_id' => 'int',
		'khoa_id' => 'int',
		'ctdt_cha_id' => 'int'
	];

	protected $fillable = [
		'ten',
		'tong_tin_chi',
		'thoi_gian_dao_tao',
		'chu_ky_id',
		'khoa_id',
		'trinh_do_dao_tao',
		'ma_chuong_trinh_dao_tao',
		'ctdt_cha_id'
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
