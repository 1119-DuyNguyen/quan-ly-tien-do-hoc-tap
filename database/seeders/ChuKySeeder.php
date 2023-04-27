<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChuKySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 5; $i++) {
            try {
                ChuKy::create([
                    'id' => $i+1,
                    'nam_bat_dau' => fake()->numberBetween(2000, 2023),
                    'nam_ket_thuc' => fake()->numberBetween(2000, 2023),
                    'ten' => fake()->word
                ]);
            } catch (Exception $e) {
                // nothing to do
                $i--;
            }
        }
    }
}
