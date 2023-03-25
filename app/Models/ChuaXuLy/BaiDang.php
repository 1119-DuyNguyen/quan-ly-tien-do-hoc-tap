<?php



namespace App\Models;


use App\Models\NhomHoc;
use App\Models\BinhLuan;
use App\Models\FileBaiDang;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Model;



class BaiDang extends Model
{
	protected $table = 'bai_dang';
	public $timestamps = false;

	protected $casts = [
		'create_at' => 'date',
		'nhom_hoc_id' => 'int',
		'nguoi_dung_id' => 'int'
	];

	protected $fillable = [
		'tieu_de',
		'noi_dung',
		'create_at',
		'nhom_hoc_id',
		'nguoi_dung_id'
	];

	public function tai_khoan()
	{
		return $this->belongsTo(TaiKhoan::class, 'nguoi_dung_id');
	}

	public function nhom_hoc()
	{
		return $this->belongsTo(NhomHoc::class);
	}

	public function binh_luans()
	{
		return $this->hasMany(BinhLuan::class);
	}

	public function file_bai_dangs()
	{
		return $this->hasMany(FileBaiDang::class);
	}
}
