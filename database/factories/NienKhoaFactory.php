<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\NienKhoa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\NienKhoa>
 */
final class NienKhoaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = NienKhoa::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'id' => fake()->randomNumber(),
            'nganh_id' => \App\Models\Nganh::factory(),
            'chuong_trinh_dao_tao_id' => \App\Models\ChuongTrinhDaoTao::factory(),
        ];
    }
}
