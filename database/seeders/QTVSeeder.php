<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QTVSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        TaiKhoan::create([
            'ten' => fake()->realText(20),
            'ten_dang_nhap' => 'qtv',
            //123456
            'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
            'remember_token' => Str::random(10),
            'khoa_id' => Khoa::all()->random()->id,
            // 'lop_hoc_id' => fake()->randomNumber(),
            'quyen_id' => 4,
        ]);
    }
}