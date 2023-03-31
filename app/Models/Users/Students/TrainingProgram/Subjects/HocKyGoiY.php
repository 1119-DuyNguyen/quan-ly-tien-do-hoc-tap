<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;



use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKhoiKienThuc;

class HocKyGoiY extends Model
{
	protected $table = 'hoc_ky_goi_y';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'chuong_trinh_dao_tao_id' => 'int',
		'hoc_ky_goi_y' => 'int',
		'hoc_phan_khoi_kien_thuc_id' => 'int'
	];

	public function hoc_phan_khoi_kien_thuc()
	{
		return $this->belongsTo(HocPhanKhoiKienThuc::class);
	}

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class);
	}
}
