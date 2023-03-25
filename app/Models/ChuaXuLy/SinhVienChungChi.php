<?php



namespace App\Models;

use App\Models\ChungChi;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;

class SinhVienChungChi extends Model
{
	protected $table = 'sinh_vien_chung_chi';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'chung_chi_id' => 'int',
		'sinh_vien_id' => 'int'
	];

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
	}

	public function chung_chi()
	{
		return $this->belongsTo(ChungChi::class);
	}
}
