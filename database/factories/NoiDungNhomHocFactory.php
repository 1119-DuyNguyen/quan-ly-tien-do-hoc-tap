<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\NoiDungNhomHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\NoiDungNhomHoc>
 */
final class NoiDungNhomHocFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = NoiDungNhomHoc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'tenND' => fake()->randomNumber(),
            'loaiND' => fake()->randomNumber(),
            'maND' => fake()->randomNumber(),
            'chiTietND' => fake()->randomNumber(),
            'maNhomHoc' => \App\Models\NhomHoc::factory(),
        ];
    }
}
