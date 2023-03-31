<?php

namespace App\Models\Users\Students\TrainingProgram;



use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;


class KhoiKienThucChuongTrinhDaoTao extends Model
{
	protected $table = 'khoi_kien_thuc_chuong_trinh_dao_tao';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'khoi_kien_thuc_id' => 'int',
		'chuong_trinh_dao_tao_id' => 'int'
	];

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class);
	}

	public function khoi_kien_thuc()
	{
		return $this->belongsTo(KhoiKienThuc::class);
	}
}
