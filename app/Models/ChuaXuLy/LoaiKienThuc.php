<?php


namespace App\Models;

use App\Models\KhoiKienThuc;
use Illuminate\Database\Eloquent\Model;


class LoaiKienThuc extends Model
{
	protected $table = 'loai_kien_thuc';
	public $timestamps = false;

	protected $fillable = [
		'ten'
	];

	public function khoi_kien_thucs()
	{
		return $this->hasMany(KhoiKienThuc::class);
	}
}
