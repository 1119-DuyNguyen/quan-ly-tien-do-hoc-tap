<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Classes\NhomHoc;
use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;

class NhomHocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 1; $i < 11; ++$i) {
            NhomHoc::create([
                //không biết tại sao nhưng nếu id là 0,
                // và không có id default thì seed lỗi
                'id' => $i,
                'so_luong_sinh_vien' => fake()->randomNumber(2),
                'stt_nhom' => fake()->randomNumber(2),
                'nhom_thuc_hanh' => fake()->randomNumber(2),
                'hoc_phan_id' => HocPhan::all()->random()->id,
                'giang_vien_id' => TaiKhoan::all()
                    ->where('quyen_id', '=', '2')
                    ->random()->id,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
            ]);
        }
    }
}