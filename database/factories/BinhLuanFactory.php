<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\BinhLuan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BinhLuan>
 */
final class BinhLuanFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = BinhLuan::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'noi_dung' => fake()->word,
            'create_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
            'bai_dang_id' => \App\Models\BaiDang::factory(),
            'nguoi_dung_id' => \App\Models\Users\TaiKhoan::factory(),
            'binh_luan_id' => \App\Models\BinhLuan::factory(),
            'path_enumeration' => fake()->word,
        ];
    }
}
