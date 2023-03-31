<?php

namespace App\Models\Users\Students\Graduate;




use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\SinhVienChungChi;
use App\Models\Users\Students\Graduate\ChuanDauRa;


class ChungChi extends Model
{
	protected $table = 'chung_chi';
	public $timestamps = false;

	protected $fillable = [
		'ten_chung_chi',
		'ghi_chu'
	];

	public function chuan_dau_ras()
	{
		return $this->hasMany(ChuanDauRa::class);
	}

	public function sinh_vien_chung_chis()
	{
		return $this->hasMany(SinhVienChungChi::class);
	}
}
