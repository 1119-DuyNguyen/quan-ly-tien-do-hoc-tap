<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram\Subjects;

use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\Subjects\KetQua>
 */
final class KetQuaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = KetQua::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'hoc_phan_id' => \App\Models\Users\Students\TrainingProgram\Subjects\HocPhan::factory(),
            'sinh_vien_id' => \App\Models\Authorization\TaiKhoan::factory(),
            'diem_qua_trinh' => fake()->randomFloat(),
            'diem_cuoi_ky' => fake()->randomFloat(),
            'diem_tong_ket' => fake()->randomFloat(),
            'diem_he_4' => fake()->randomFloat(),
            'loai_he_4' => fake()->word,
            'qua_mon' => fake()->boolean,
            'bien_che_id' => \App\Models\Users\Students\TrainingProgram\BienChe::factory(),
        ];
    }
}
