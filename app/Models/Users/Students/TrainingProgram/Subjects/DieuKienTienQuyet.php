<?php

namespace App\Models\Users\Students\TrainingProgram\Subjects;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;




class DieuKienTienQuyet extends Model
{
	protected $table = 'dieu_kien_tien_quyet';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'hoc_phan_id' => 'int',
		'hoc_phan_truoc_id' => 'int',
        'chuong_trinh_dao_tao_id'
	];

    protected $fillable = [
        'hoc_phan_id',
		'hoc_phan_truoc_id',
        'chuong_trinh_dao_tao_id'
    ];

	public function hoc_phan()
	{
		return $this->belongsTo(HocPhan::class, 'hoc_phan_truoc_id');
	}
}
