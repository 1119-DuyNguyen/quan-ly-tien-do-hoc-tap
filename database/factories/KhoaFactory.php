<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Khoa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Khoa>
 */
final class KhoaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Khoa::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maKhoa' => fake()->randomNumber(),
            'tenKhoa' => fake()->randomNumber(),
        ];
    }
}
