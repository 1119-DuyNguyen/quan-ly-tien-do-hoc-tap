<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKhoiKienThucBB;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;

class HPKTTBatBuocSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 0; $i < 10; $i++) {
            HocPhanKhoiKienThucBB::create([
                'hoc_phan_id' => $i+1,
                'khoi_kien_thuc_id' => KhoiKienThuc::all()->random()->id,
                'hoc_ky_goi_y' => fake()->numberBetween(1,9)
            ]);
        }
    }
}