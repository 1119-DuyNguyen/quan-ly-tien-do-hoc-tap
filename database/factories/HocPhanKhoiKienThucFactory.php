<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\HocPhanKhoiKienThuc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\HocPhanKhoiKienThuc>
 */
final class HocPhanKhoiKienThucFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = HocPhanKhoiKienThuc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'hoc_phan_id' => \App\Models\HocPhan::factory(),
            'khoi_kien_thuc_id' => \App\Models\KhoiKienThuc::factory(),
        ];
    }
}
