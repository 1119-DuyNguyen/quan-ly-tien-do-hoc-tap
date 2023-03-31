<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram\Subjects;

use App\Models\Users\Students\TrainingProgram\Subjects\DieuKienTienQuyet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\Subjects\DieuKienTienQuyet>
 */
final class DieuKienTienQuyetFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = DieuKienTienQuyet::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'hoc_phan_id' => fake()->randomNumber(),
            'hoc_phan_truoc_id' => \App\Models\Users\Students\TrainingProgram\Subjects\HocPhan::factory(),
        ];
    }
}
