<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram\Subjects;

use App\Models\Khoa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc>
 */
final class KhoiKienThucFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = KhoiKienThuc::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'ten' => fake()->text,
            'so_tin_chi' => fake()->boolean,
            'khoa_id' => Khoa::factory(),
            'loai_kien_thuc_id' => \App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc::factory(),
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
