<?php


namespace App\Models;

use App\Models\HocPhan;
use Illuminate\Database\Eloquent\Model;

class DieuKienTienQuyet extends Model
{
	protected $table = 'dieu_kien_tien_quyet';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'hoc_phan_id' => 'int',
		'hoc_phan_truoc_id' => 'int'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class, 'hoc_phan_truoc_id');
	}
}
