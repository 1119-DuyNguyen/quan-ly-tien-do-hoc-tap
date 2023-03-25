<?php


namespace App\Models;


use App\Models\Khoa;
use App\Models\HocPhan;
use App\Models\LoaiKienThuc;
use App\Models\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Model;


class KhoiKienThuc extends Model
{
	protected $table = 'khoi_kien_thuc';
	public $timestamps = false;

	protected $casts = [
		'so_tin_chi' => 'int',
		'khoa_id' => 'int',
		'loai_kien_thuc_id' => 'int'
	];

	protected $fillable = [
		'ten',
		'so_tin_chi',
		'khoa_id',
		'loai_kien_thuc_id'
	];

	public function khoa()
	{
		return $this->belongsTo(Khoa::class);
	}

	public function loai_kien_thuc()
	{
		return $this->belongsTo(LoaiKienThuc::class);
	}

	public function hoc_phans()
	{
		return $this->belongsToMany(HocPhan::class)
			->withPivot('id');
	}

	public function chuong_trinh_dao_taos()
	{
		return $this->belongsToMany(ChuongTrinhDaoTao::class, 'khoi_kien_thuc_chuong_trinh_dao_tao');
	}
}
