<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students;

use App\Models\Users\Students\ThamGia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\ThamGia>
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
            'nhom_hoc_id' => \App\Models\Users\Classes\NhomHoc::factory(),
            'sinh_vien_id' => \App\Models\Authorization\TaiKhoan::factory(),
        ];
    }
}
