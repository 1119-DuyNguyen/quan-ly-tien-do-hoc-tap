<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram;

use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao>
 */
final class ChuongTrinhDaoTaoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChuongTrinhDaoTao::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $tenCTDT = $this->faker->unique()->realText(20);
        return [
            'ten' => $tenCTDT,
            'tong_tin_chi' => rand(1, 150),
            'thoi_gian_dao_tao' =>  rand(1, 5),
            'chu_ky_id' => \App\Models\Users\Students\TrainingProgram\ChuKy::all()->random()->id,
            'khoa_id' => \App\Models\Khoa::all()->random()->id,
            'trinh_do_dao_tao' => fake()->word,
            'ma_chuong_trinh_dao_tao' => $tenCTDT,
            'ctdt_cha_id' => null,
        ];
    }
}
