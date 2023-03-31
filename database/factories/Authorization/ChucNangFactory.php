<?php

declare(strict_types=1);

namespace Database\Factories\Authorization;

use App\Models\Authorization\ChucNang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Authorization\ChucNang>
 */
final class ChucNangFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChucNang::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'ten' => $this->faker->unique()->randomElement(['Lớp học', 'Chương trình đào tạo', 'Điểm']),
            'ghi_chu' => fake()->realText(20),
        ];
    }
}
