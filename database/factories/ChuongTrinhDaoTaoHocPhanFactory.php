<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ChuongTrinhDaoTaoHocPhan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ChuongTrinhDaoTaoHocPhan>
 */
final class ChuongTrinhDaoTaoHocPhanFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ChuongTrinhDaoTaoHocPhan::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'HKKhuyenNghi' => fake()->randomNumber(),
            'maCTDT' => \App\Models\ChuongTrinhDaoTao::factory(),
            'maHP' => \App\Models\HocPhan::factory(),
        ];
    }
}
