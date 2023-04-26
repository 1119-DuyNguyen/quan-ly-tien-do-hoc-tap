<?php

namespace Database\Seeders;

use App\Models\Authorization\TaiKhoan;
use App\Models\Nganh;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use DB;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChuongTrinhDaoTaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // for ($i = 0; $i < 5; $i++) {
        //     try {
        //         ChuongTrinhDaoTao::create([
        //             'ten' => fake()->word,
        //             'thoi_gian_dao_tao' => 4,
        //             'nganh_id' => Nganh::all()->random()->id,
        //             'chu_ky_id' => ChuKy::all()->random()->id
        //         ]);
        //     } catch (Exception $e) {
        //         // nothing to do
        //         $i--;
        //     }
        // }

        DB::statement("INSERT INTO `chuong_trinh_dao_tao` (`id`, `ten`, `tong_tin_chi`, `thoi_gian_dao_tao`, `trinh_do_dao_tao`, `updated_at`, `created_at`, `nganh_id`, `chu_ky_id`) VALUES
        (1, 'Chương trình đào tạo ngành Công nghệ thông tin', 0, 4, NULL, '2023-04-21 03:24:56', '2023-04-21 03:24:56', 1, 5),
        (2, 'quibusdam', 0, 4, NULL, '2023-04-21 03:24:56', '2023-04-21 03:24:56', 1, 5),
        (3, 'minima', 0, 4, NULL, '2023-04-21 03:24:56', '2023-04-21 03:24:56', 2, 2),
        (4, 'repudiandae', 0, 4, NULL, '2023-04-21 03:24:56', '2023-04-21 03:24:56', 1, 4),
        (5, 'hic', 0, 4, NULL, '2023-04-21 03:24:56', '2023-04-21 03:24:56', 1, 4);");
    }
}
