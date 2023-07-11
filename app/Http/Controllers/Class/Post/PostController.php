<?php

namespace App\Http\Controllers\Class\Post;

use App\Events\AnythingBePosted;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\FileBaiDang;

class PostController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('bai_dang')
            ->join('tai_khoan', 'bai_dang.nguoi_dung_id', '=', 'tai_khoan.id')
            ->join('nhom_hoc', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->select(
                'bai_dang.id as bai_dang_id',
                'tai_khoan.ten as ten_nguoi_dang',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.noi_dung as noi_dung',
                'bai_dang.created_at as created_at'
            )
            ->where('bai_dang.loai_noi_dung', '=', '1')
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
                'bai_dang.created_at as created_at'
            )
            ->where('bai_dang.loai_noi_dung', '=', '1')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }

    public function store(Request $request, BaiDang $baiDang)
    {
        $baiDang = $request->all();
        broadcast(new AnythingBePosted($request->user(), $baiDang));
        try {
            $request['nguoi_dung_id'] = $request->user()->id;
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
            return $this->success($baiDang, 201, 'Đã đăng bài viết');
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
            return $this->success($baiDang, 201, 'Đã cập nhật bài đăng');
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
            return $this->success(null, 204, 'Đã xoá bài đăng');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server delete không thành công');
        }
    }
}