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
            'ten' => fake()->unique(true)->randomElement(['Sinh Viên', 'Giảng Viên', "Cố vấn học tập", "Quản trị viên"]),
            'ghi_chu' => fake()->text(20),

        ];
    }
}
