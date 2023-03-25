<?php


namespace App\Models;

use App\Models\BaiDang;
use Illuminate\Database\Eloquent\Model;


class FileBaiDang extends Model
{
	protected $table = 'file_bai_dang';
	public $timestamps = false;

	protected $casts = [
		'create_at' => 'date',
		'bai_dang_id' => 'int'
	];

	protected $fillable = [
		'link',
		'create_at',
		'bai_dang_id'
	];

	public function bai_dang()
	{
		return $this->belongsTo(BaiDang::class);
	}
}
