<?php

declare(strict_types=1);

namespace Database\Factories\Users\Classes\Posts;

use App\Models\Users\Classes\Posts\BinhLuan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Classes\Posts\BinhLuan>
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
            'noi_dung' => fake()->text,
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
            'bai_dang_id' => \App\Models\Users\Classes\Posts\BaiDang::factory(),
            'nguoi_dung_id' => \App\Models\Authorization\TaiKhoan::factory(),
            'binh_luan_id' => \App\Models\Users\Classes\Posts\BinhLuan::factory(),
            'path_enumeration' => fake()->word,
        ];
    }
}
