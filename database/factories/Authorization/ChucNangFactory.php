<?php

declare(strict_types=1);

namespace Database\Factories\Authorization;

use App\Models\Authorization\ChucNang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Authorization\ChucNang>
 */
final class ChucNangFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ChucNang::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        // "create",
        // "read",
        // "update",
        // "delete",
        //restore
        //force_delete
        // $type = [
        //     "Đọc",
        //     "Ghi",
        //     "Sửa",
        //     "Xóa",
        // ];
        // $chucNang = ["Chương trình đào tạo", "Trang chủ", ""];
        return [
            'ten' => fake()->word,
            'ghi_chu' => fake()->text,
            'create_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
