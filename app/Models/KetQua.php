<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class KetQua
 * 
 * @property float $diemQuaTrinh
 * @property float $diemThi
 * @property float $TK_10
 * @property string $TK_CH
 * @property float $TK_4
 * @property string $KQ
 * @property Carbon $thoiDiem
 * @property int $maHP
 * @property int $mssv
 * 
 * @property HocPhan $hoc_phan
 * @property SinhVien $sinh_vien
 *
 * @package App\Models
 */
class KetQua extends Model
{
	protected $table = 'ket_qua';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'diemQuaTrinh' => 'float',
		'diemThi' => 'float',
		'TK_10' => 'float',
		'TK_4' => 'float',
		'thoiDiem' => 'date',
		'maHP' => 'int',
		'mssv' => 'int'
	];

	protected $fillable = [
		'diemQuaTrinh',
		'diemThi',
		'TK_10',
		'TK_CH',
		'TK_4',
		'KQ',
		'thoiDiem'
	];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class, 'maHP');
	}

	public function sinh_vien()
	{
		return $this->belongsTo(SinhVien::class, 'mssv');
	}
}
