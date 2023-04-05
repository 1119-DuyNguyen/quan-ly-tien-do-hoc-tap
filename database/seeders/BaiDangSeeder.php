<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Classes\NhomHoc;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Classes\Posts\BaiDang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
                //do cột id auto increment nên khỏi set id, không thì bug
                //'id' => $i,
                'tieu_de' => fake()->word,
                'noi_dung' => fake()->word,
                'nhom_hoc_id' => NhomHoc::all()->random()->id,
                'nguoi_dung_id' => TaiKhoan::all()
                    ->where('quyen_id', '=', '2')
                    ->random()->id,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
            ]);
        }
    }
}