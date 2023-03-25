<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Khoa;
use App\Models\Nganh;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Nganh>
 */
final class NganhFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Nganh::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {

        return [
            'ma_nganh' => fake()->unique()->text(20),
            'ten' => fake()->unique(true)->randomElement(["hốt rác", "fuho", "ăn không ngồi rồi", "trăm măm"]),
            'khoa_id' => Khoa::all()->random()->id,
        ];
    }
}
