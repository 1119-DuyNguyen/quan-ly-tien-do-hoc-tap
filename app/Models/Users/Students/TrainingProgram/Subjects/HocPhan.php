<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;



use App\Models\Users\Classes\NhomHoc;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\DieuKienTienQuyet;


class HocPhan extends Model
{
	protected $table = 'hoc_phan';
	public $timestamps = false;

	protected $casts = [
		'so_tin_chi' => 'int',
		'phan_tram_giua_ki' => 'int',
		'phan_tram_cuoi_ki' => 'int'
	];

	protected $fillable = [
		'ma_hoc_phan',
		'ten',
		'so_tin_chi',
		'phan_tram_giua_ki',
		'phan_tram_cuoi_ki'
	];

	public function dieu_kien_tien_quyets()
	{
		return $this->hasMany(DieuKienTienQuyet::class, 'hoc_phan_truoc_id');
	}

	public function khoi_kien_thucs()
	{
		return $this->belongsToMany(KhoiKienThuc::class)
			->withPivot('id');
	}

	public function ket_quas()
	{
		return $this->hasMany(KetQua::class);
	}

	public function nhom_hocs()
	{
		return $this->hasMany(NhomHoc::class);
	}
}
