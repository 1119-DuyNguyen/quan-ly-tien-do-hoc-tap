<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
use Exception;
use Illuminate\Support\Facades\DB;

class KhoiKienThucSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 0; $i < 4; $i++) {
            DB::table('muc_luc')
            ->insert(array(
                'ten' => fake()->word,
            ));
        }
        for ($i = 0; $i < 4; $i++) {
            KhoiKienThuc::create([
                'ten' => fake()->word,
                'loai_kien_thuc_id' => $i+1,
                'chuong_trinh_dao_tao_id' => 1,
                'muc_luc_id' => $i+1
            ]);
        }
    }
}