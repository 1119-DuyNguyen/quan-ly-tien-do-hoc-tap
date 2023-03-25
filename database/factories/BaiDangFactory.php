<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\BaiDang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BaiDang>
 */
final class BaiDangFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = BaiDang::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'tieu_de' => fake()->word,
            'noi_dung' => fake()->text,
            'create_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
            'nhom_hoc_id' => \App\Models\NhomHoc::factory(),
            'nguoi_dung_id' => \App\Models\Users\TaiKhoan::factory(),
        ];
    }
}
