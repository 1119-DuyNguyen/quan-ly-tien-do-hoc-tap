<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KetQuaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 300; $i++) {
            try {
                KetQua::create([
                    'hoc_phan_id' => HocPhan::all()->random()->id,
                    'sinh_vien_id' => TaiKhoan::all()
                        ->where('quyen_id', '=', '1')
                        ->random()->id,
                    'diem_qua_trinh' => fake()->randomFloat(2, 0, 10),
                    'diem_cuoi_ky' => fake()->randomFloat(2, 0, 10),
                    'diem_tong_ket' => fake()->randomFloat(2, 0, 10),
                    'diem_he_4' => fake()->randomFloat(0, 0, 4),
                    'qua_mon' => fake()->numberBetween(0, 1),
                    'bien_che_id' => BienChe::all()->random()->id, 
                ]);
            } catch (Exception $e) {
                // nothing to do
                $i--;
            }
        }
    }
}
