<?php

namespace App\Http\Controllers\Class\Post;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use App\Models\Users\Classes\Posts\BaiDang;
use PhpParser\Node\Stmt\TryCatch;

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
        try {
            $baiDang->create($request->all());
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