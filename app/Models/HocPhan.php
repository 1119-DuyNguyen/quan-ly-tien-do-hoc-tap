<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class HocPhan
 * 
 * @property int $maHP
 * @property int $tenHP
 * @property int $soTC
 * @property int $soTietLT
 * @property int $batBuoc
 * @property int $tinhVaoTichLuy
 * @property int $soTietTH
 * @property int $ptKT
 * @property int $ptThi
 * 
 * @property Collection|ChuongTrinhDaoTao[] $chuong_trinh_dao_taos
 * @property Collection|KetQua[] $ket_quas
 * @property Collection|NhomHoc[] $nhom_hocs
 *
 * @package App\Models
 */
class HocPhan extends Model
{
	protected $table = 'hoc_phan';
	protected $primaryKey = 'maHP';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'maHP' => 'int',
		'tenHP' => 'int',
		'soTC' => 'int',
		'soTietLT' => 'int',
		'batBuoc' => 'int',
		'tinhVaoTichLuy' => 'int',
		'soTietTH' => 'int',
		'ptKT' => 'int',
		'ptThi' => 'int'
	];

	protected $fillable = [
		'tenHP',
		'soTC',
		'soTietLT',
		'batBuoc',
		'tinhVaoTichLuy',
		'soTietTH',
		'ptKT',
		'ptThi'
	];

	public function chuong_trinh_dao_taos()
	{
		return $this->belongsToMany(ChuongTrinhDaoTao::class, 'chuong_trinh_dao_tao_hoc_phan', 'maHP', 'maCTDT')
					->withPivot('HKKhuyenNghi');
	}

	public function ket_quas()
	{
		return $this->hasMany(KetQua::class, 'maHP');
	}

	public function nhom_hocs()
	{
		return $this->hasMany(NhomHoc::class, 'maHP');
	}
}
