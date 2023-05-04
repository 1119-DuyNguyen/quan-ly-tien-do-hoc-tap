<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Khoa;
use App\Models\Nganh;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Database\Seeders\KhoaSeeder;
use Illuminate\Support\Facades\DB;
use App\Models\Authorization\Quyen;
use App\Models\Users\Classes\NhomHoc;
use App\Models\Users\Staffs\NhanVien;
use App\Models\Users\Students\LopHoc;
use App\Models\Authorization\ChucNang;
use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Staffs\GiangVien;
use App\Models\Users\Students\ThamGia;
use Illuminate\Support\Facades\Schema;
use App\Models\Users\Students\NienKhoa;
use App\Models\Users\Students\SinhVien;
use App\Models\Users\Staffs\CoVanHocTap;
use App\Models\Users\Staffs\QuanTriVien;
use Database\Seeders\QuyenChucNangSeeder;
use App\Models\Users\Students\MocThoiGian;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\BinhLuan;
use App\Models\Users\Classes\Posts\FileBaiDang;
use App\Models\Users\Students\SinhVienChungChi;
use App\Models\Users\Classes\Posts\FileBinhLuan;
use App\Models\Users\Students\Graduate\ChungChi;
use App\Models\Users\Students\TinhTrangSinhVien;
use App\Models\Users\Students\Graduate\ChuanDauRa;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use Database\Factories\Users\Students\LopHocFactory;
use App\Models\Users\Students\TrainingProgram\BienChe;
use App\Models\Users\Students\TrainingProgram\Subjects\KetQua;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\HocKyGoiY;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\DieuKienTienQuyet;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKhoiKienThuc;
use App\Models\Users\Students\TrainingProgram\KhoiKienThucChuongTrinhDaoTao;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        //remove nào có khóa ngoại

        // Nganh::truncate();
        // Quyen::truncate();
        // TaiKhoan::truncate();
        // Khoa::truncate();

        $tableNames = Schema::getConnection()
            ->getDoctrineSchemaManager()
            ->listTableNames();
        foreach ($tableNames as $name) {
            //no truncate oauth
            // if (str_contains($name, 'oauth')) {
            //     continue;
            // }
            DB::table($name)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        //base database

        //php arrtisan db:seed

        $this->call(QuyenSeeder::class);
        $this->call(ChucNangSeeder::class);
        $this->call(QuyenChucNangSeeder::class);


        $this->call(OauthClientsSeeder::class);
        Khoa::factory(4)->create();
        Nganh::factory(3)->create();
        // ChuKy::factory(4)->create();
        $this->call(ChuKySeeder::class);
        // ChucNang::factory()->count(10)->create();
        $this->call(ChuongTrinhDaoTaoSeeder::class);
        // NienKhoa::factory()
        //     ->count(10)
        //     ->create();

        // users
        $this->call(GVSeeder::class);
        $this->call(CVHTSeeder::class);
        $this->call(QTVSeeder::class);
        $this->call(TroLyDaoTaoSeeder::class);

        // LopHoc::factory()
        //     ->count(5)
        //     ->create();
        $this->call([SVSeeder::class]);
        $this->call([HocPhanSeeder::class]);
        $this->call([NhomHocSeeder::class]);
        $this->call([BaiDangSeeder::class]);
        $this->call([ThamGiaSeeder::class]);
        $this->call([BaiTapSinhVienSeeder::class]);

        // BienChe::factory()
        //     ->count(10)
        //     ->create();
        $this->call(KetQuaSeeder::class);

        $this->call([LoaiKienThucSeeder::class]);
        $this->call([KhoiKienThucSeeder::class]);

        $this->call([HPKTTBatBuocSeeder::class]);
        $this->call([HPKTTTuChonSeeder::class]);

        // DB::statement("INSERT INTO `tinh_trang_sinh_vien` (`id`, `so_lan_canh_cao`, `da_tot_nghiep`, `moc_thoi_gian_id`, `buoc_thoi_hoc`, `updated_at`, `created_at`, `sinh_vien_id`, `ly_do_buoc_thoi_hoc`, `lop_hoc_id`, `khoi_kien_thuc_id`) VALUES
        // (1, 0, 0, NULL, NULL, '2023-04-19 23:55:31', '2023-04-19 23:55:31', 63, NULL, 1, 4);");

        // HocPhan::factory()
        //     ->count(10)
        //     ->create();
        // NhomHoc::factory()
        //     ->count(10)
        //     ->create();
        // BaiDang::factory()->count(10)->create();
        // BinhLuan::factory()->count(10)->create();
        // FileBaiDang::factory()->count(10)->create();
        // FileBinhLuan::factory()->count(10)->create();
        // QuanTriVien::factory()->count(10)->create();
        // MocThoiGian::factory()->count(10)->create();
        // SinhVienChungChi::factory()->count(10)->create();
        // ThamGia::factory()->count(10)->create();
        // TinhTrangSinhVien::factory()->count(10)->create();
        // ChuanDauRa::factory()->count(10)->create();
        // ChungChi::factory()->count(10)->create();
        // BienChe::factory()->count(10)->create();
        // ChuKy::factory()->count(10)->create();
        // KhoiKienThucChuongTrinhDaoTao::factory()->count(10)->create();
        // DieuKienTienQuyet::factory()->count(10)->create();
        // HocKyGoiY::factory()->count(10)->create();
        // HocPhanKhoiKienThuc::factory()->count(10)->create();
        // KetQua::factory()->count(10)->create();
        // KhoiKienThuc::factory()->count(3)->create();
        // LoaiKienThuc::factory()->count(3)->create();

        // ChucNang::factory()->count(10)->create();
    }
}
