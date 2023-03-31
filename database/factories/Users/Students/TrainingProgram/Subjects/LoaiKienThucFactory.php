<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram\Subjects;

use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc>
 */
final class LoaiKienThucFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = LoaiKienThuc::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'ten' => fake()->text,
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
