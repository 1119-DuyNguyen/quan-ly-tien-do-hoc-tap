<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\BienChe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BienChe>
 */
final class BienCheFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = BienChe::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'id' => fake()->randomNumber(),
            'ten' => fake()->word,
            'ngay_bat_dau' => fake()->dateTime(),
            'ngay_ket_thuc' => fake()->dateTime(),
        ];
    }
}
