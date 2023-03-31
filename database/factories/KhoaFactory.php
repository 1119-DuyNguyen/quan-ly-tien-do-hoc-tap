<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Khoa;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Khoa>
 */
final class KhoaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Khoa::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {

        $ten = $this->faker->randomElement(["Công nghệ thông tin", "Toán ứng dụng", "Mỹ thuật", "Tài chính kế toán"]);

        return [
            'ma_khoa' => Str::slug($ten),
            // 'ten' => $this->faker->unique()->randomElement(["Công nghệ thông tin", "Toán ứng dụng", "Mỹ thuật", "Tài chính kế toán"]),
            'ten' =>  $ten,
        ];
    }
}
