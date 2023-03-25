<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use App\Models\Khoa;
use App\Models\Nganh;
use App\Models\Users\TaiKhoan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Authorization\Quyen;
use Reliese\Database\Eloquent\Model;
use App\Models\Authorization\ChucNang;
use Symfony\Component\Process\Process;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        //remove nào có khóa ngoại rồi mới tới mấy bảng không có làm ngược lại từ dưới lên trên cái base

        Nganh::truncate();
        Quyen::truncate();
        TaiKhoan::truncate();
        Khoa::truncate();


        //base database
        Khoa::factory()->count(1)->create();
        Nganh::factory()->count(5)->create();
        Quyen::factory()->count(4)->create();
        TaiKhoan::factory()->count(4)->create();

        // ChucNang::factory()->count(10)->create();
    }
}
