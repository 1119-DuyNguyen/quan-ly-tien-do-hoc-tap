<?php

namespace Database\Seeders;

use App\Models\Authorization\ChucNang;
use Illuminate\Database\Seeder;


class ChucNangSeeder extends Seeder
{
    public function run(): void
    {
        //
        // //bai_tap_sinh_vien
        $cacChucNang = [
            [
                'Trang chủ',
                'fa-solid fa-house icon',
                'dashboard'
            ],
            [
                'Thông tin cá nhân',
                'fa-regular fa-address-card icon',
                'info'
            ],
            [
                'Tiến độ tốt nghiệp',
                'fa-regular fa-user-graduate icon',
                'graduate'
            ],
            [
                'Chương trình đào tạo',
                'fa-regular fa-school icon',
                'program'
            ],
            [
                'Lớp học',
                'fa-solid fa-chalkboard icon',
                'classroom'
            ],
            [
                'Quyền',
                'fa-solid fa-building-shield icon',
                'role'
            ],
            [
                'Tài khoản',
                'fa-regular fa-user icon',
                'user'
            ],
            [
                'edit-post',
                '',
                ''
            ]
        ];

        foreach ($cacChucNang as $chucNang) {

            ChucNang::create([
                'ten' => $chucNang[0],
                'icon' => $chucNang[1],
                'href' => $chucNang[2],
                'ghi_chu' => fake()->realText(20),
            ]);
        }
    }
}
