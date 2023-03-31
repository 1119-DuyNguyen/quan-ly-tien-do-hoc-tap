<?php

declare(strict_types=1);

namespace Database\Factories\Users\Classes\Posts;

use App\Models\Users\Classes\Posts\BaiDang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Classes\Posts\BaiDang>
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
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
            'nhom_hoc_id' => \App\Models\Users\Classes\NhomHoc::factory(),
            'nguoi_dung_id' => \App\Models\Authorization\TaiKhoan::factory(),
        ];
    }
}
