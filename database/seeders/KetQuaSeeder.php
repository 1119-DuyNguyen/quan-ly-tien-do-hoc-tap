<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use DB;
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
        DB::statement("INSERT INTO `bien_che` (`id`, `ten`, `ngay_bat_dau`, `ngay_ket_thuc`, `updated_at`, `created_at`, `ky_he`) VALUES
        (1, 'Học kỳ 1 - Năm học 2021-2022', '2021-09-01 00:00:00', '2022-01-20 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (2, 'Học kỳ 2 - Năm học 2021-2022', '2022-02-14 00:00:00', '2022-06-15 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (3, 'Học kỳ 3 - Năm học 2021-2022', '2022-07-01 00:00:00', '2022-08-05 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 1),
        (4, 'Học kỳ 1 - Năm học 2022-2023', '2022-09-01 00:00:00', '2023-01-20 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (5, 'Học kỳ 2 - Năm học 2022-2023', '2023-02-14 00:00:00', '2023-06-15 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (6, 'Học kỳ 3 - Năm học 2022-2023', '2023-07-01 00:00:00', '2023-08-05 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 1),
        (7, 'Học kỳ 1 - Năm học 2023-2024', '2023-09-01 00:00:00', '2024-01-20 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (8, 'Học kỳ 2 - Năm học 2023-2024', '2024-02-14 00:00:00', '2024-06-15 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0),
        (9, 'Học kỳ 3 - Năm học 2023-2024', '2024-07-01 00:00:00', '2024-08-05 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 1),
        (10, 'Học kỳ 1 - Năm học 2024-2025', '2024-09-01 00:00:00', '2025-01-20 23:59:59', '2023-04-18 11:10:23', '2023-04-18 11:10:23', 0);");
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
