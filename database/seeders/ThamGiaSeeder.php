<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Classes\NhomHoc;
use App\Models\Users\Students\ThamGia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ThamGiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countSV = TaiKhoan::all()->where('quyen_id', '=', '1');
        //cho mỗi sv học 5 nhóm, id nhóm từ 1 tới 5
        $countSV->each(function ($item, $key) {
            for ($i = 1; $i <= 10; $i++) {
                ThamGia::create([
                    'nhom_hoc_id' => $i,
                    'sinh_vien_id' => $item->id,
                ]);
            }
        });
    }
}