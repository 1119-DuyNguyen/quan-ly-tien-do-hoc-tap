<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ChungChi
 * 
 * @property int $maCC
 * @property string $tenCC
 * @property string $ghiChu
 * @property int $mssv
 * 
 * @property SinhVien $sinh_vien
 * @property Collection|YeuCau[] $yeu_caus
 *
 * @package App\Models
 */
class ChungChi extends Model
{
	protected $table = 'chung_chi';
	protected $primaryKey = 'maCC';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maCC' => 'int',
		'mssv' => 'int'
	];

	protected $fillable = [
		'tenCC',
		'ghiChu',
		'mssv'
	];

	public function sinh_vien()
	{
		return $this->belongsTo(SinhVien::class, 'mssv');
	}

	public function yeu_caus()
	{
		return $this->hasMany(YeuCau::class, 'maCC');
	}
}
