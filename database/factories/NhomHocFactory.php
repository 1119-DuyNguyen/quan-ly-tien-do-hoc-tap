<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\NhomHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\NhomHoc>
 */
final class NhomHocFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = NhomHoc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maNhomHoc' => fake()->randomNumber(),
            'tenNhomHoc' => fake()->randomNumber(),
            'soLuongSV' => fake()->randomNumber(),
            'maHP' => \App\Models\HocPhan::factory(),
            'maCB' => \App\Models\CanBo::factory(),
        ];
    }
}
