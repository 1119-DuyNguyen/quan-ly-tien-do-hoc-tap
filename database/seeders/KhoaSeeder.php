<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class KhoaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $khoaArr = ["Công nghệ thông tin", "Toán ứng dụng", "Mỹ thuật", "Tài chính kế toán"];
        // for ($i = 0; $i < count($khoaArr) - 1; $i++) {
        //     Khoa::create(
        //         [
        //             'ma_khoa' => $this->faker->unique->word,
        //             'ten' => $khoaArr[$i],
        //         ]
        //     );
        // }
    }
}
