<?php


namespace App\Models\Users\Students\TrainingProgram\Subjects;


use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;


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
