<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\LopHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\LopHoc>
 */
final class LopHocFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = LopHoc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'nien_khoa_id' => \App\Models\NienKhoa::factory(),
            'co_van_hoc_tap_id' => \App\Models\Users\TaiKhoan::factory(),
            'ten_lop' => fake()->word,
            'ma_lop' => fake()->word,
        ];
    }
}
