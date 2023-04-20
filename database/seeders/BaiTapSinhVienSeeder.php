<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Seeder;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;

class BaiTapSinhVienSeeder extends Seeder
{
    public function run(): void
    {
        //
        // //bai_tap_sinh_vien
        for ($i = 0; $i < 5; $i++) {
            BaiTapSinhVien::create([
                'bai_tap_id' => BaiDang::all()
                    ->where('loai_noi_dung', '=', '2')
                    ->random()->id,
                'sinh_vien_id' => TaiKhoan::all()
                    ->where('quyen_id', '=', '1')
                    ->random()->id,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
            ]);
        }
    }
}