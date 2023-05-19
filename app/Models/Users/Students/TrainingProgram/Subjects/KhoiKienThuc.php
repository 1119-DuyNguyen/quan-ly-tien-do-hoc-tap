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

	protected $casts = [
		'so_tin_chi' => 'int',
		'id' => 'int',
		'loai_kien_thuc_id' => 'int',
        'muc_luc_id' => 'int',
		'tong_tin_chi_kkt_tu_chon' => 'int',
		'tong_tin_chi_kkt_bat_buoc' => 'int',
		'chuong_trinh_dao_tao_id' => 'int',
        'dai_cuong' => 'int'
	];

	// protected $fillable = [
	// 	'ten',
	// 	'so_tin_chi',
	// 	'khoa_id',
	// 	'loai_kien_thuc_id'
	// ];
	protected $fillable = [
		'ten',
		'tong_tin_chi_ktt_tu_chon',
		'loai_kien_thuc_id',
		'chuong_trinh_dao_tao_id',
        'dai_cuong',
        'muc_luc_id'
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

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsToMany(ChuongTrinhDaoTao::class, 'chuong_trinh_dao_tao_id');
	}
}
