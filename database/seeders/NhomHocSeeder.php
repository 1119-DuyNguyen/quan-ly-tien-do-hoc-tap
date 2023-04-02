<?php

namespace Database\Seeders;

use App\Models\Khoa;
use App\Models\Users\Classes\NhomHoc;
use App\Models\Users\Staffs\GiangVien;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class NhomHocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 0; $i < 10; ++$i) {
            NhomHoc::create([
                'id' => $i,
                'so_luong_sinh_vien' => fake()->randomNumber(2),
                'stt_nhom' => fake()->randomNumber(2),
                'nhom_thuc_hanh' => fake()->randomNumber(2),
                'hoc_phan_id' => HocPhan::all()->random()->id,
                'giang_vien_id' => GiangVien::all()->random()->id,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
            ]);
        }
    }
}