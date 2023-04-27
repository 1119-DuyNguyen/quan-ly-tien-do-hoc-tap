<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PaginationRequest;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;
use Illuminate\Support\Str;

class BaiTapSinhVienController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        return $this->paginate($request, 'bai_tap_sinh_vien', 3, 1, 'bai_tap_id');
    }

    public function store(Request $request)
    {
        try {
            $name = time() . uniqid() . '.' . $request->file('files')->extension();
            Storage::putFileAs('files', $request->file('files'), $name);
            $storeData['bai_tap_id'] = $request->bai_tap_id;
            $storeData['sinh_vien_id'] = $request->user()->id;
            $storeData['link_file'] = 'files/' . $name;

            BaiTapSinhVien::insert($storeData);

            return $this->success($request, 201, 'Created');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server create không thành công');
        }
    }

    public function show(Request $request, string $bai_tap_id)
    {
        $data = DB::table('bai_tap_sinh_vien')
            ->where('bai_tap_id', '=', $bai_tap_id)
            ->where('sinh_vien_id', '=', $request->user()->id)
            ->get()
            ->first();

        return $data->link_file;
    }

    public function destroy(Request $request, string $bai_tap_id)
    {
        $linkFile = DB::table('bai_tap_sinh_vien')
            ->where('bai_tap_id', '=', $bai_tap_id)
            ->where('sinh_vien_id', '=', $request->user()->id)
            ->get()
            ->first();
        $baiTap = BaiTapSinhVien::where('bai_tap_id', $bai_tap_id)->where('sinh_vien_id', $request->user()->id);
        Storage::delete($linkFile->link_file);
        try {
            $baiTap->delete();
            return $this->success(null, 204, 'Deleted');
        } catch (Exception $e) {
            //catch exception
            echo 'Message: ' . $e->getMessage();
            return $this->error(400, 'Lỗi server delete không thành công');
        }
    }
}