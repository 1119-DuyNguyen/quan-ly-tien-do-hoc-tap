<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;


class HocPhanKhoiKienThuc extends Model
{
	protected $table = 'hoc_phan_khoi_kkt_bat_buoc';
	public $timestamps = false;

	protected $casts = [
		'hoc_phan_id' => 'int',
		'khoi_kien_thuc_id' => 'int',
        'hoc_ky_goi_y' => 'int'
	];

	protected $fillable = [
		'hoc_phan_id',
		'khoi_kien_thuc_id',
        'hoc_ky_goi_y'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class);
	}

	public function khoi_kien_thuc()
	{
		return $this->belongsTo(KhoiKienThuc::class);
	}

	public function hoc_ky_goi_ys()
	{
		return $this->hasMany(HocKyGoiY::class);
	}
}
