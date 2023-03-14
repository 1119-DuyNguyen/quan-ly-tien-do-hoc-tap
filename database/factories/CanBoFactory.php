<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\CanBo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\CanBo>
 */
final class CanBoFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = CanBo::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maCB' => fake()->randomNumber(),
            'hoTenCB' => fake()->randomNumber(),
            'quyenHan' => fake()->randomNumber(),
        ];
    }
}
