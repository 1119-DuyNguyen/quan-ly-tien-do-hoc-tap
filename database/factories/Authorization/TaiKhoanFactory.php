<?php

declare(strict_types=1);

namespace Database\Factories\Authorization;

use App\Models\Khoa;
use Illuminate\Support\Str;
use App\Models\Authorization\TaiKhoan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Authorization\TaiKhoan>
 */
final class CoVanHocTapFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TaiKhoan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'ten' => fake()->realText(20),
            'ten_dang_nhap' => $this->faker->unique()->randomElement(['sv1', 'sv2', 'sv', 'sv4']),
            //123456
            'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
            'remember_token' => Str::random(10),
            'khoa_id' => null,
            // 'lop_hoc_id' => fake()->randomNumber(),
            'remember_token' => Str::random(10),
            'lop_hoc_id' => null,
        ];
    }
}
