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
            'id' => fake()->randomNumber(),
            'ten' => fake()->word,
            'tong_tin_chi' => fake()->randomNumber(),
            'thoi_gian_dao_tao' => fake()->randomFloat(),
            'ctdt_cha_id' => \App\Models\ChuongTrinhDaoTao::factory(),
            'chu_ky_id' => \App\Models\ChuKy::factory(),
            'khoa_id' => \App\Models\Khoa::factory(),
            'trinh_do_dao_tao' => fake()->word,
        ];
    }
}
