<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\HocPhan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\HocPhan>
 */
final class HocPhanFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = HocPhan::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maHP' => fake()->randomNumber(),
            'tenHP' => fake()->randomNumber(),
            'soTC' => fake()->randomNumber(),
            'soTietLT' => fake()->randomNumber(),
            'batBuoc' => fake()->randomNumber(),
            'tinhVaoTichLuy' => fake()->randomNumber(),
            'soTietTH' => fake()->randomNumber(),
            'ptKT' => fake()->randomNumber(),
            'ptThi' => fake()->randomNumber(),
        ];
    }
}
