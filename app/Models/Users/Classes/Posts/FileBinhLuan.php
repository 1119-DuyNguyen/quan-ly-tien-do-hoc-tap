<?php

namespace App\Models\Users\Classes\Posts;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Classes\Posts\BinhLuan;


class FileBinhLuan extends Model
{
	protected $table = 'file_binh_luan';
	public $timestamps = false;

	protected $casts = [
		'create_at' => 'date',
		'binh_luan_id' => 'int'
	];

	protected $fillable = [
		'link',
		'create_at',
		'binh_luan_id'
	];

	public function binh_luan()
	{
		return $this->belongsTo(BinhLuan::class);
	}
}
