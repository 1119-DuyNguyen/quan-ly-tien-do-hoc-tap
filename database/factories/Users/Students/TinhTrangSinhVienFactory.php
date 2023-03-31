<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students;

use App\Models\Users\Students\TinhTrangSinhVien;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TinhTrangSinhVien>
 */
final class TinhTrangSinhVienFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = TinhTrangSinhVien::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'so_lan_canh_cao' => fake()->boolean,
            'da_tot_nghiep' => fake()->boolean,
            'moc_thoi_gian_id' => \App\Models\Users\Students\MocThoiGian::factory(),
            'buoc_thoi_hoc' => fake()->word,
            'sinh_vien_id' => \App\Models\Authorization\TaiKhoan::factory(),
        ];
    }
}
