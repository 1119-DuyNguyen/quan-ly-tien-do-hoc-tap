<?php

namespace App\Http\Controllers\Class\Post;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\FileBaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;
use Illuminate\Support\Str;

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

    public function store(Request $request, BaiDang $baiDang)
    {
        try {
            $baiDang->create($request->all());
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $name = time() . rand(1, 100) . Str::random(40) . '.' . $file->extension();
                    Storage::putFileAs('files', $file, $name);

                    $fileData['bai_dang_id'] = DB::table('bai_dang')->max('id');
                    $fileData['link'] = 'files/' . $name;

                    FileBaiDang::create($fileData);
                }
            }
            return $this->success($baiDang, 201, 'Created');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server update không thành công');
        }
    }

    public function update(string $id, Request $request)
    {
        $baiDang = BaiDang::find($id);
        try {
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $name = time() . rand(1, 100) . Str::random(40) . '.' . $file->extension();
                    Storage::putFileAs('files', $file, $name);

                    $fileData['bai_dang_id'] = $id;
                    $fileData['link'] = 'files/' . $name;

                    FileBaiDang::where('bai_dang_id', $id)->update($fileData);
                }
            }
            $baiDang->update($request->all());
            return $this->success($baiDang, 201, 'Updated');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server update không thành công');
        }
    }

    public function destroy(string $id)
    {
        $baiDang = BaiDang::find($id);
        try {
            $baiDang->delete();
            return $this->success(null, 204, 'Deleted');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server delete không thành công');
        }
    }
}