<?php

namespace Database\Seeders;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HocPhanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 0; $i < 3; $i++) {
            HocPhan::create([
                'ma_hoc_phan' => fake()->word,
                'ten' => fake()->word,
                'so_tin_chi' => fake()->numberBetween(1, 4),
                'phan_tram_giua_ki' => 50,
                'phan_tram_cuoi_ki' => 50,
                'updated_at' => fake()->dateTime(),
                'created_at' => fake()->dateTime(),
            ]);
        }
    }
}