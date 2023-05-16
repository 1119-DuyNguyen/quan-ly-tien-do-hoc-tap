<?php

namespace App\Http\Controllers\Class\Post;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Events\AnythingBePosted;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PaginationRequest;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\FileBaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;

class BaitapController extends ApiController
{
    public function index(Request $request)
    {
        $data = DB::table('tai_khoan')
            ->where('tai_khoan.id', '=', $request->user()->id)
            ->join('tham_gia', 'tham_gia.sinh_vien_id', '=', 'tai_khoan.id')
            ->join('nhom_hoc', 'nhom_hoc.id', '=', 'tham_gia.nhom_hoc_id')
            ->join('hoc_phan', 'hoc_phan.id', '=', 'nhom_hoc.hoc_phan_id')
            ->join('bai_dang', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->select(
                'bai_dang.id as bai_dang_id',
                'nhom_hoc.id as id_nhom_hoc',
                'hoc_phan.ten as ten_mon_hoc',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.created_at as created_at',
                'bai_dang.ngay_ket_thuc as ngay_ket_thuc'
            )
            ->where('bai_dang.loai_noi_dung', '=', '2')
            ->orderBy('nhom_hoc.id')
            ->get();
        //return dd($data);
        return $this->success($data, 200, 'Đã lấy thông tin bài tập');
    }

    public function show(PaginationRequest $request, string $nhom_hoc_id)
    {
        $request['dir'] = 'desc';
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
            ->where('bai_dang.loai_noi_dung', '=', '2');
        // ->get();
        //return dd($request->all());
        if ($request['sortBaiTap'] == 'moiNhat') {
            return $this->paginateMultipleTable($request, $data, null, ['bai_dang.created_at'], null, 10);
        } elseif ($request['sortBaiTap'] == 'deadline') {
            return $this->paginateMultipleTable($request, $data, null, ['bai_dang.ngay_ket_thuc'], null, 10);
        }
    }

    public function store(Request $request, BaiDang $baiDang)
    {
        $baiDang = $request->all();
        broadcast(new AnythingBePosted($request->user(), $baiDang));
        try {
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $name = time() . rand(1, 100) . Str::random(40) . '.' . $file->extension();
                    Storage::putFileAs('files', $file, $name);

                    $fileData['bai_dang_id'] = DB::table('bai_dang')->max('id');
                    $fileData['link'] = '/files/' . $name;

                    FileBaiDang::create($fileData);
                }
            }
            BaiDang::create($request->all());
            return $this->success($baiDang, 201, 'Đã đăng bài tập');
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
                    $fileData['link'] = '/files/' . $name;

                    FileBaiDang::where('bai_dang_id', $id)->update($fileData);
                }
            }
            $baiDang->update($request->all());
            return $this->success($baiDang, 201, 'Đã cập nhật bài tập');
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
            return $this->success(null, 204, 'Đã xoá bài tập');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server delete không thành công');
        }
    }
}
