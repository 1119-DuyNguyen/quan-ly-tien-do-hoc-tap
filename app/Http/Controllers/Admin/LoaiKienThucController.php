<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MucLucRequest;

class LoaiKienThucController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            DB::table('loai_kien_thuc')->get();
            return $this->success(null, 200, 'Lấy dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công');
        }
    }
    public function all()
    {      # code...
        try {
            $data =   DB::table('loai_kien_thuc')->get();
            return $this->success($data, 200, '');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Yêu cầu gửi lên máy chủ bị lỗi');
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(MucLucRequest $request)
    {
        try {
            DB::table('muc_luc')->insert([
                'ten' =>  $request->ten,
            ]);
            return $this->success(null, 200, 'Thêm dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
