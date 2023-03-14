<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SinhVien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\SinhVien>
 */
final class SinhVienFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = SinhVien::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'mssv' => fake()->randomNumber(),
            'hoTen' => fake()->randomNumber(),
            'soTCPhaiHocLai' => fake()->randomNumber(),
            'tongTCDaHoc' => fake()->randomNumber(),
            'maNganh' => \App\Models\Nganh::factory(),
            'maNienKhoa' => \App\Models\NienKhoa::factory(),
            'maKhoa' => \App\Models\Khoa::factory(),
        ];
    }
}
