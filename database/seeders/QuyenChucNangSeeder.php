<?php

namespace Database\Seeders;

use App\Models\Authorization\ChucNang;
use DB;
use Illuminate\Database\Seeder;


class QuyenChucNangSeeder extends Seeder
{
    public function run(): void
    {
        //
        // //bai_tap_sinh_vien
        [
            'Sinh Viên', 'Giảng Viên',
            'Cố vấn học tập', 'Quản trị viên', 'Trợ lý đào tạo'
        ];
        $ChucNangQuyen = [
            [
                [1, 4],
                1,

            ],
            [
                [1, 2, 3, 4, 5],
                2
            ],
            [
                [1, 3, 4],
                3
            ],
            [
                [4],
                4
            ],
            [
                [1, 2, 4],
                5
            ],
            [
                [4],
                6
            ],
            [
                [4],
                7
            ],
            // [
            //     'edit-post',
            //     '',
            //     ''
            // ]
        ];

        foreach ($ChucNangQuyen as $value) {
            $cacQuyen = $value[0];
            $chucNang = $value[1];
            foreach ($cacQuyen as $q) {
                DB::table('chuc_nang_quyen')->insert([
                    'chuc_nang_id' => $chucNang,
                    'quyen_id' =>  $q
                ]);
            }
        }
    }
}
