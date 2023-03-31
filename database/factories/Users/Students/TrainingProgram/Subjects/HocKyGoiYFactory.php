<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram\Subjects;

use App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY>
 */
final class HocKyGoiYFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = HocKyGoiY::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'chuong_trinh_dao_tao_id' => \App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao::factory(),
            'hoc_ky_goi_y' => fake()->randomNumber(),
            'hoc_phan_khoi_kien_thuc_id' => \App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKhoiKienThuc::factory(),
        ];
    }
}
