<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;

class ClassController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('nhom_hoc')
            ->join('tai_khoan', 'nhom_hoc.giang_vien_id', '=', 'tai_khoan.id')
            ->where('tai_khoan.quyen_id', '=', '3') //là 2 mới đúng, dùng 3 vì nó trả về nhiều data thôi
            ->join('hoc_phan', 'hoc_phan.id', '=', 'nhom_hoc.hoc_phan_id')
            ->select('hoc_phan.ten as ten_hoc_phan', 'tai_khoan.ten as ten_giang_vien', 'nhom_hoc.id as nhom_hoc_id')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }
    public function show(string $id)
    {
        $data = DB::table('nhom_hoc')
            ->where('nhom_hoc.id', '=', $id)
            ->join('tai_khoan', 'nhom_hoc.giang_vien_id', '=', 'tai_khoan.id')
            ->where('tai_khoan.quyen_id', '=', '3') //là 2 mới đúng, dùng 3 vì nó trả về nhiều data thôi
            ->join('hoc_phan', 'hoc_phan.id', '=', 'nhom_hoc.hoc_phan_id')
            ->select(
                'hoc_phan.ten as ten_hoc_phan',
                'tai_khoan.ten as ten_giang_vien',
                'nhom_hoc.stt_nhom as stt_nhom',
                'hoc_phan.ma_hoc_phan as ma_hoc_phan'
            )
            ->get();
        return $this->success($data, 200, 'Success');
    }
}