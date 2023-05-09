<?php

namespace App\Models\Users\Students;


use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users\Students\MocThoiGian;

class TinhTrangSinhVien extends Model
{
    protected $table = 'tinh_trang_sinh_vien';

    protected $casts = [
        'so_lan_canh_cao' => 'int',
        'da_tot_nghiep' => 'int',
        'moc_thoi_gian_id' => 'int',
        'buoc_thoi_hoc' => 'int',
        'sinh_vien_id' => 'int',
        'lop_hoc_id' => 'int',
        'khoi_kien_thuc_id' => 'int'
    ];

    protected $fillable = [
        'so_lan_canh_cao', 'da_tot_nghiep', 'moc_thoi_gian_id', 'buoc_thoi_hoc', 'sinh_vien_id', 'ly_do_buoc_thoi_hoc', 'lop_hoc_id', 'khoi_kien_thuc_id'
    ];

    public function sinh_vien()
    {
        return $this->belongsTo(TaiKhoan::class, 'sinh_vien_id');
    }
    public function moc_thoi_gian()
    {
        return $this->belongsTo(MocThoiGian::class);
    }
}
