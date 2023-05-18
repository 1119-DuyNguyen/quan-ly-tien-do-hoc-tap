<?php

namespace App\Models\Users\Students\TrainingProgram;

use App\Models\Khoa;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\Graduate\ChuanDauRa;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChuongTrinhDaoTao extends Model
{
	protected $table = 'chuong_trinh_dao_tao';

	use HasFactory;

	protected $casts = [
		'tong_tin_chi' => 'int',
		'thoi_gian_dao_tao' => 'float',
		'nganh_id' => 'int',
		'chu_ky_id' => 'int',
        'hinh_thuc_dao_tao' => 'int'
	];

	protected $fillable = [
		'ten',
		'thoi_gian_dao_tao',
		'trinh_do_dao_tao',
        'hinh_thuc_dao_tao',
		'nganh_id',
		'chu_ky_id',
		'tong_tin_chi',
		'ghi_chu'
	];
	public function chu_ky()
	{
		return $this->belongsTo(ChuKy::class);
	}


	public function khoa()
	{
		return $this->belongsTo(Khoa::class);
	}

	public function chuan_dau_ras()
	{
		return $this->hasMany(ChuanDauRa::class);
	}



	public function hoc_ky_goi_ys()
	{
		return $this->hasMany(HocKyGoiY::class);
	}

	public function khoi_kien_thucs()
	{
		return $this->hasMany(KhoiKienThuc::class, 'id');
	}

	public function nien_khoas()
	{
		return $this->hasMany(NienKhoa::class);
	}
}
