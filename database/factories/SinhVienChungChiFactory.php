<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SinhVienChungChi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\SinhVienChungChi>
 */
final class SinhVienChungChiFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = SinhVienChungChi::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'chung_chi_id' => \App\Models\ChungChi::factory(),
            'sinh_vien_id' => \App\Models\Users\TaiKhoan::factory(),
        ];
    }
}
