<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Classes\NhomHoc;
use Illuminate\Database\Seeder;
use App\Models\Users\Classes\Posts\BaiDang;

class BaiDangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // //bai_dang
        for ($i = 0; $i < 20; $i++) {
            BaiDang::create([
                'tieu_de' => fake()->word,
                'noi_dung' => fake()->word,
                //1 post    2 bài tập
                'loai_noi_dung' => fake()->randomElement(['1', '2']),
                'nhom_hoc_id' => NhomHoc::all()->random()->id,
                'nguoi_dung_id' => TaiKhoan::all()
                    ->where('quyen_id', '=', '2')
                    ->random()->id,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
                'ngay_ket_thuc' => fake()->dateTime(),
            ]);
        }
    }
}