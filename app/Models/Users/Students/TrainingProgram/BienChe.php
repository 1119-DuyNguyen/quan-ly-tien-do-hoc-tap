<?php


namespace App\Models\Users\Students\TrainingProgram;


use Illuminate\Database\Eloquent\Model;

class BienChe extends Model
{
	protected $table = 'bien_che';

	protected $casts = [
		'ngay_bat_dau' => 'date',
		'ngay_ket_thuc' => 'date'
	];

	protected $fillable = [
		'ten',
		'ngay_bat_dau',
		'ngay_ket_thuc'
	];
	public function ket_quas()
	{
		return $this->hasMany(KetQua::class);
	}
}
