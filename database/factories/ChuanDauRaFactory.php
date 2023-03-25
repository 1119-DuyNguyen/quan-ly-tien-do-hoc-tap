<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ChuanDauRa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ChuanDauRa>
 */
final class ChuanDauRaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ChuanDauRa::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'chung_chi_id' => \App\Models\ChungChi::factory(),
            'chuong_trinh_dao_tao_id' => \App\Models\ChuongTrinhDaoTao::factory(),
        ];
    }
}
