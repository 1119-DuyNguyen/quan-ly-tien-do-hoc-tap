<?php

declare(strict_types=1);

namespace Database\Factories\Users;

use App\Models\Khoa;
use Illuminate\Support\Str;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\TaiKhoan>
 */
final class TaiKhoanFactory extends Factory
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
            'ten' => fake()->word,
            'ten_dang_nhap' => $this->faker->unique()->randomElement(["admin", "gv", "sv", "cvht"]),
            //123456
            'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
            'remember_token' => Str::random(10),
            'khoa_id' => Khoa::all()->random()->id
            // 'lop_hoc_id' => fake()->randomNumber(),
        ];
    }
}
