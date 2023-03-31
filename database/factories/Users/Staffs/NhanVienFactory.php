<?php

declare(strict_types=1);

namespace Database\Factories\Users\Staffs;

use App\Models\Users\Staffs\NhanVien;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Staffs\NhanVien>
 */
final class NhanVienFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = NhanVien::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'ten' => fake()->word,
            'ten_dang_nhap' => fake()->word,
            'mat_khau' => fake()->word,
            'remember_token' => Str::random(10),
            'khoa_id' => \App\Models\Khoa::factory(),
            'lop_hoc_id' => fake()->randomNumber(),
        ];
    }
}
