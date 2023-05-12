<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use App\Models\Authorization\TaiKhoan;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;

class ChamDiemController extends ApiController
{
    public function show(string $bai_tap_id)
    {
        $data = DB::table('bai_tap_sinh_vien')
            ->join('bai_dang', 'bai_dang.id', '=', 'bai_tap_sinh_vien.bai_tap_id')
            ->where('bai_tap_sinh_vien.bai_tap_id', '=', $bai_tap_id)
            ->join('tai_khoan', 'tai_khoan.id', '=', 'bai_tap_sinh_vien.sinh_vien_id')
            ->select(
                'bai_tap_sinh_vien.created_at as ngay_nop',
                'bai_dang.ngay_ket_thuc as han_nop',
                'tai_khoan.ten as ten_sinh_vien',
                'bai_tap_sinh_vien.diem as diem',
                'bai_tap_sinh_vien.link_file as link_file',
                'tai_khoan.id as sinh_vien_id'
            )
            ->get();

        return $this->success($data, 200, 'Đã lấy data điểm của bài tập có id ' . $bai_tap_id);
    }

    public function store(Request $request)
    {
        $nd = $request->noi_dung_cham;
        $bt_id = $request->bai_tap_id;
        for ($i = 0; $i < count($nd); $i++) {
            $nd_item = $nd[$i];

            // kiểm tra
            $check =
                BaiTapSinhVien::where('bai_tap_id', '=', $bt_id, 'and')
                    ->where('sinh_vien_id', '=', $nd_item['sinh_vien_id'])
                    ->count() > 0;

            $tonTaiSV =
                TaiKhoan::where('id', '=', $nd_item['sinh_vien_id'], 'and')
                    ->where('quyen_id', '=', '1')
                    ->count() > 0;

            $tonTaiBaiTap = BaiDang::where('id', '=', $bt_id)->count() > 0;

            if (!$tonTaiBaiTap) {
                return $this->error('', 404, 'Không tồn tại bài đăng trên hệ thống');
            }

            if (!$tonTaiSV) {
                return $this->error('', 404, 'Không tồn tại sinh viên trên hệ thống');
            }

            if ($check) {
                BaiTapSinhVien::where('bai_tap_id', '=', $bt_id, 'and')
                    ->where('sinh_vien_id', '=', $nd_item['sinh_vien_id'])
                    ->update([
                        'diem' => intval($nd_item['diem']),
                    ]);
                continue;
            }

            try {
                BaiTapSinhVien::insert([
                    'bai_tap_id' => $bt_id,
                    'sinh_vien_id' => $nd_item['sinh_vien_id'],
                    'diem' => intval($nd_item['diem']),
                ]);
            } catch (\Exception $e) {
                return $this->error($e, 500, 'Xảy ra lỗi khi thực hiện thêm điểm vào cơ sở dữ liệu!');
            }
        }

        return $this->success($request, 200, 'Thành công');
    }
}