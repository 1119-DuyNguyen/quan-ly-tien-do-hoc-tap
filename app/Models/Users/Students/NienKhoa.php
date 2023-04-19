<?php

namespace App\Models\Users\Students;

use App\Models\Nganh;
use App\Models\Users\Students\LopHoc;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NienKhoa extends Model
{
	protected $table = 'nien_khoa';
	public $incrementing = false;
	public $timestamps = false;

	use HasFactory;

	protected $casts = [
		'id' => 'int',
		'nganh_id' => 'int',
		'chuong_trinh_dao_tao_id' => 'int'
	];

	protected $fillable = [
		'nganh_id',
		'chuong_trinh_dao_tao_id'
	];

	public function chuong_trinh_dao_tao()
	{
		return $this->belongsTo(ChuongTrinhDaoTao::class);
	}

	public function nganh()
	{
		return $this->belongsTo(Nganh::class);
	}

	public function lop_hocs()
	{
		return $this->hasMany(LopHoc::class);
	}
}
