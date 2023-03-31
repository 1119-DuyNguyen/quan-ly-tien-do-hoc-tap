<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram;

use App\Models\Users\Students\TrainingProgram\KhoiKienThucChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\KhoiKienThucChuongTrinhDaoTao>
 */
final class KhoiKienThucChuongTrinhDaoTaoFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = KhoiKienThucChuongTrinhDaoTao::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'khoi_kien_thuc_id' => \App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc::factory(),
            'chuong_trinh_dao_tao_id' => \App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao::factory(),
        ];
    }
}
