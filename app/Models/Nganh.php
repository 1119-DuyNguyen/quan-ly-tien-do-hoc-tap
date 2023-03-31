<?php

namespace App\Models;



use App\Models\Khoa;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Nganh extends Model
{
    protected $table = 'nganh';
    public $timestamps = true;
    use HasFactory;

    protected $fillable = ['ma_nganh', 'ten', 'khoa_id'];

    public function khoa()
    {
        return $this->belongsTo(Khoa::class);
    }

    public function nien_khoas()
    {
        return $this->hasMany(NienKhoa::class);
    }
}
