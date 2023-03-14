<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\CanBoKhoa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\CanBoKhoa>
 */
final class CanBoKhoaFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = CanBoKhoa::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'maKhoa' => \App\Models\Khoa::factory(),
            'maCB' => \App\Models\CanBo::factory(),
        ];
    }
}
