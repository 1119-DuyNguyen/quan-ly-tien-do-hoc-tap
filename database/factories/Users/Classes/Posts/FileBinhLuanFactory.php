<?php

declare(strict_types=1);

namespace Database\Factories\Users\Classes\Posts;

use App\Models\Users\Classes\Posts\FileBinhLuan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Classes\Posts\FileBinhLuan>
 */
final class FileBinhLuanFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = FileBinhLuan::class;

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
            'binh_luan_id' => \App\Models\Users\Classes\Posts\BinhLuan::factory(),
        ];
    }
}
