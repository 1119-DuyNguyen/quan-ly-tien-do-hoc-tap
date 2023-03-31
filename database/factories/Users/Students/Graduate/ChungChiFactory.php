<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\Graduate;

use App\Models\Users\Students\Graduate\ChungChi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\Graduate\ChungChi>
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
            'ten_chung_chi' => fake()->word,
            'ghi_chu' => fake()->text,
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
