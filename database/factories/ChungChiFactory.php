<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ChungChi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ChungChi>
 */
final class ChungChiFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ChungChi::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maCC' => fake()->randomNumber(),
            'tenCC' => fake()->word,
            'ghiChu' => fake()->text,
            'mssv' => \App\Models\SinhVien::factory(),
        ];
    }
}
