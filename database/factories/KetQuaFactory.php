<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\KetQua;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\KetQua>
 */
final class KetQuaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = KetQua::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'diemQuaTrinh' => fake()->randomFloat(),
            'diemThi' => fake()->randomFloat(),
            'TK_10' => fake()->randomFloat(),
            'TK_CH' => fake()->word,
            'TK_4' => fake()->randomFloat(),
            'KQ' => fake()->word,
            'thoiDiem' => fake()->date(),
            'maHP' => \App\Models\HocPhan::factory(),
            'mssv' => \App\Models\SinhVien::factory(),
        ];
    }
}
