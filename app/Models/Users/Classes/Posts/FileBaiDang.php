<?php


namespace App\Models\Users\Classes\Posts;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Classes\Posts\BaiDang;


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
