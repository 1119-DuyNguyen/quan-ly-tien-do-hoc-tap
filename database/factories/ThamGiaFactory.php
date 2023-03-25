<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ThamGia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\ThamGia>
 */
final class ThamGiaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = ThamGia::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'nhom_hoc_id' => \App\Models\NhomHoc::factory(),
            'sinh_vien_id' => \App\Models\Users\TaiKhoan::factory(),
        ];
    }
}
