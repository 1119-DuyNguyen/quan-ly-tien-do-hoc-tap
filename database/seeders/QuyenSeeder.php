<?php

namespace Database\Seeders;

use App\Models\Authorization\Quyen;
use Illuminate\Database\Seeder;
// use App\Models\Authorization\Quyen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QuyenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $quyen = ['Sinh Viên', 'Giảng Viên', 'Giảng viên và cố vấn học tập', 'Quản trị viên', 'Trợ lý đào tạo'];
        foreach ($quyen as $q) {
            Quyen::create(
                [
                    'ten' => $q,
                    'ghi_chu' => fake()->realText(20)
                ]
            );
        }
    }
}
