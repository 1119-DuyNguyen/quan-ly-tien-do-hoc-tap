<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class BienChe extends Model
{
	protected $table = 'bien_che';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'ngay_bat_dau' => 'date',
		'ngay_ket_thuc' => 'date'
	];

	protected $fillable = [
		'ten',
		'ngay_bat_dau',
		'ngay_ket_thuc'
	];
}
