<?php

declare(strict_types=1);

namespace Database\Factories\Authorization;

use App\Models\Authorization\Quyen;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Authorization\Quyen>
 */
final class QuyenFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quyen::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'ten' => $this->faker->unique()->randomElement(['Sinh Viên', 'Giảng Viên', 'Cố vấn học tập', 'Quản trị viên', 'Trợ lý đào tạo']),
            'ghi_chu' => fake()->realText(20),
        ];
    }
}
