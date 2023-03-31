<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;



use App\Models\Khoa;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;


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
