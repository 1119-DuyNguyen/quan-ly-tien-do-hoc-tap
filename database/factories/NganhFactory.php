<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Khoa;
use App\Models\Nganh;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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
        $ten = $this->faker->unique(false, 4)->randomElement(["Công nghệ thông tin", "Kỹ thuật phần mềm", "Hệ thống thông tin", "Khoa học máy tính"]);
        $slug = Str::slug($ten);
        $idKhoa = DB::table('khoa')->where('ten', "Công nghệ thông tin")->first()->id;
        return [
            'ma_nganh' => $slug,
            'ten' => $ten,
            'khoa_id' => $idKhoa
        ];
    }
}
