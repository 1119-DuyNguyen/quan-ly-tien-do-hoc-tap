<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ChuKy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ChuKy>
 */
final class ChuKyFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ChuKy::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'nam_bat_dau' => fake()->date(),
            'nam_ket_thuc' => fake()->word,
            'ten' => fake()->word,
        ];
    }
}
