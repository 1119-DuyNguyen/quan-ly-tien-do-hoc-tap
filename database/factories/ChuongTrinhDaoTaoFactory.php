<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ChuongTrinhDaoTao>
 */
final class ChuongTrinhDaoTaoFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ChuongTrinhDaoTao::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maCTDT' => fake()->randomNumber(),
            'tenCTDT' => fake()->randomNumber(),
            'batDau' => fake()->randomNumber(),
            'ketThuc' => fake()->randomNumber(),
            'tongTC' => fake()->randomNumber(),
            'thoiGian' => fake()->randomNumber(),
            'maNganh' => \App\Models\Nganh::factory(),
        ];
    }
}
