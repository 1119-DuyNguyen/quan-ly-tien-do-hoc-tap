<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students;

use App\Models\Users\Staffs\CoVanHocTap;
use Illuminate\Support\Str;
use App\Models\Users\TaiKhoan;
use App\Models\Users\Students\LopHoc;
use App\Models\Users\Students\NienKhoa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\LopHoc>
 */
final class LopHocFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LopHoc::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $tenlop = $this->faker->unique()->realText(20);
        $cvhtCount = CoVanHocTap::all()->count();
        $nienKhoaCount = NienKhoa::all()->count();
        $arr = [];
        for ($i = 1; $i <= $cvhtCount; $i++) {
            for ($j = 1; $j <= $nienKhoaCount; $j++) {
                array_push($arr, $i . "-" . $j);
            }
        }
        $arr = $this->faker->unique->randomElement($arr);

        $arr = explode('-', $arr);
        $cvht_id = $arr[0];
        $nk_id = $arr[1];
        return [
            'nien_khoa_id' => $nk_id,
            'co_van_hoc_tap_id' => $cvht_id,
            'ten_lop' => $tenlop,
            'ma_lop' => $tenlop,
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
