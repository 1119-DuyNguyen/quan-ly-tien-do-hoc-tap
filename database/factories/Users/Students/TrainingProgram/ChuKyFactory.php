<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students\TrainingProgram;

use App\Models\Users\Students\TrainingProgram\ChuKy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\TrainingProgram\ChuKy>
 */
final class ChuKyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChuKy::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'nam_bat_dau' => 2010,
            'nam_ket_thuc' => 2022,
            'ten' => fake()->word,
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
