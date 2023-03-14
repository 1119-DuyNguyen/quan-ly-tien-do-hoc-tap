<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\YeuCau;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\YeuCau>
 */
final class YeuCauFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = YeuCau::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maCTDT' => \App\Models\ChuongTrinhDaoTao::factory(),
            'maCC' => \App\Models\ChungChi::factory(),
        ];
    }
}
