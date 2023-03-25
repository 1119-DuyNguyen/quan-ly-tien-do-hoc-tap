<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\KhoiKienThuc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\KhoiKienThuc>
 */
final class KhoiKienThucFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = KhoiKienThuc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'ten' => fake()->text,
            'so_tin_chi' => fake()->boolean,
            'khoa_id' => \App\Models\Khoa::factory(),
            'loai_kien_thuc_id' => \App\Models\LoaiKienThuc::factory(),
        ];
    }
}
