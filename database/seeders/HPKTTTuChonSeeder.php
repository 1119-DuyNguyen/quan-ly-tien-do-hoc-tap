<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKhoiKienThucTuChon;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HPKTTTuChonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 10; $i < 20; $i++) {
            HocPhanKhoiKienThucTuChon::create([
                'hoc_phan_id' => $i+1,
                'khoi_kien_thuc_id' => KhoiKienThuc::all()->random()->id,
                'hoc_ky_goi_y' => fake()->numberBetween(1,9)
            ]);
        }
    }
}