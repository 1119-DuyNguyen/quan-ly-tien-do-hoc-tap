<?php

declare(strict_types=1);

namespace Database\Factories\Users\Classes;

use App\Models\Users\Classes\NhomHoc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Classes\NhomHoc>
 */
final class NhomHocFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = NhomHoc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'id' => fake()->randomNumber(),
            'so_luong_sinh_vien' => fake()->randomNumber(),
            'stt_nhom' => fake()->word,
            'nhom_thuc_hanh' => fake()->word,
            'hoc_phan_id' => \App\Models\Users\Students\TrainingProgram\Subjects\HocPhan::factory(),
            'giang_vien_id' => \App\Models\Users\Staffs\GiangVien::factory(),
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
 