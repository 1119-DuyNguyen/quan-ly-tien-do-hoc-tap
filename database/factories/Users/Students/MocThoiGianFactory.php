<?php

declare(strict_types=1);

namespace Database\Factories\Users\Students;

use App\Models\Users\Students\MocThoiGian;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Users\Students\MocThoiGian>
 */
final class MocThoiGianFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = MocThoiGian::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'nam' => fake()->date(),
            'dot' => fake()->boolean,
            'ten' => fake()->word,
            'updated_at' => fake()->dateTime(),
            'created_at' => fake()->dateTime(),
        ];
    }
}
