<?php

namespace App\Http\Controllers\Class\Post;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;

class BaitapController extends ApiController
{
    public function index()
    {
        $data = DB::table('bai_dang')
            ->join('tai_khoan', 'bai_dang.nguoi_dung_id', '=', 'tai_khoan.id')
            ->join('nhom_hoc', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->join('bai_tap_sinh_vien', 'bai_tap_sinh_vien.bai_tap_id', '=', 'bai_dang.id')
            ->select(
                'bai_dang.id as bai_dang_id',
                'tai_khoan.ten as ten_nguoi_dang',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.noi_dung as noi_dung',
                'bai_dang.created_at as created_at'
            )
            ->where('bai_dang.loai_noi_dung', '=', '2')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }

    public function show(string $nhom_hoc_id)
    {
        $data = DB::table('bai_dang')
            ->join('tai_khoan', 'bai_dang.nguoi_dung_id', '=', 'tai_khoan.id')
            ->join('nhom_hoc', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->where('nhom_hoc.id', '=', $nhom_hoc_id)
            ->select(
                'bai_dang.id as bai_dang_id',
                'tai_khoan.ten as ten_nguoi_dang',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.noi_dung as noi_dung',
                'bai_dang.created_at as created_at',
                'bai_dang.ngay_ket_thuc as ngay_ket_thuc'
            )
            ->where('bai_dang.loai_noi_dung', '=', '2')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }

    public function store(Request $request)
    {
        return BaiDang::create($request->all());
    }

    public function destroy(string $id)
    {
        return BaiDang::where('id', $id)->delete();
    }
}