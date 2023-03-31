<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students;

use App\Models\Nganh;
use App\Models\Users\Students\NienKhoa;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\NienKhoa>
 */
final class NienKhoaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = NienKhoa::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $ctdtCount = ChuongTrinhDaoTao::all()->count();
        $nganhCount = Nganh::all()->count();
        $arr = [];
        for ($i = 1; $i <= $ctdtCount; $i++) {
            for ($j = 1; $j <= $nganhCount; $j++) {
                array_push($arr, $i . "-" . $j);
            }
        }
        $arr = $this->faker->unique->randomElement($arr);

        $arr = explode('-', $arr);
        $ctdt_id = $arr[0];
        $nganh_id = $arr[1];
        return [
            'nganh_id' => $nganh_id,
            'chuong_trinh_dao_tao_id' => $ctdt_id,
        ];
    }
}
