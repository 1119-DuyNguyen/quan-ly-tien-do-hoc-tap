<?php



namespace App\Models\Authorization;

use App\Models\Authorization\Quyen;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class ChucNang extends Model
{
	protected $table = 'chuc_nang';
	public $timestamps = false;
	use HasFactory;
	protected $casts = [];

	protected $fillable = [
		'ten',
		'ghi_chu',
	];

	// public function nhom_quyens()
	// { //return $this->belongsToMany(Role::class, 'chuc_nang_nhom_quyen'); alphabet
	// 	return $this->belongsToMany(NhomQuyen::class);
	// }
}