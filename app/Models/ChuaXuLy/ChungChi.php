<?php



namespace App\Models;

use App\Models\ChuanDauRa;
use App\Models\SinhVienChungChi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class ChungChi extends Model
{
	protected $table = 'chung_chi';
	public $timestamps = false;

	protected $fillable = [
		'ten_chung_chi',
		'ghi_chu'
	];

	public function chuan_dau_ras()
	{
		return $this->hasMany(ChuanDauRa::class);
	}

	public function sinh_vien_chung_chis()
	{
		return $this->hasMany(SinhVienChungChi::class);
	}
}
