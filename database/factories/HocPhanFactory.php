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
            'ma_hoc_phan' => fake()->word,
            'ten' => fake()->word,
            'so_tin_chi' => fake()->boolean,
            'phan_tram_giua_ki' => fake()->boolean,
            'phan_tram_cuoi_ki' => fake()->boolean,
        ];
    }
}
