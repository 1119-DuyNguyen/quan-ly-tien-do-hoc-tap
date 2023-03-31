<?php

declare(strict_types=1);

namespace Database\Factories\Users\Classes\Posts;

use App\Models\Users\Classes\Posts\FileBaiDang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Classes\Posts\FileBaiDang>
 */
final class FileBaiDangFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = FileBaiDang::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'link' => fake()->url,
            'create_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
            'bai_dang_id' => \App\Models\Users\Classes\Posts\BaiDang::factory(),
        ];
    }
}
