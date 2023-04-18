<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Authorization\ChucNang;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PermissionRequest;
use Illuminate\Support\Facades\Log;

class PermissionController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $permissons = ChucNang::all();
        return $this->success($permissons, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PermissionRequest $request)
    {
        //

        try {
            $cn = ChucNang::create($request->input());
            return $this->success($cn, 201, 'Thêm chức năng thành công');
        } catch (\Exception $err) {
            //Session::flash('error', $err->getMessage());
            Log::error($err->getMessage());
            return $this->error(null, 400, 'Thêm chức năng lỗi. Vui lòng thử lại sau');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ChucNang $chucNang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PermissionRequest $request, ChucNang $chucNang)
    {

        try {
            $chucNang->update($request->input());
            return $this->success(null, 204, 'Cập nhập thành công');
        } catch (\Exception $err) {
            //Session::flash('error', $err->getMessage());
            Log::error($err->getMessage());
            return $this->error(null, 400, 'Cập nhập chức năng bị lỗi. Vui lòng thử lại sau');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChucNang $chucNang)
    {
        //
        if ($chucNang) {
            // $path = str_replace('storage', 'public', $product->thumb);
            // Storage::delete($path);
            $chucNang->delete();
            return $this->success(null, 204, 'Xóa thành công');
        }

        return $this->error(null, 400, 'Đã có lỗi xảy ra');
    }
}
