<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;

class ClassroomController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        $data = DB::table('nhom_hoc')
            ->join('tai_khoan', 'nhom_hoc.giang_vien_id', '=', 'tai_khoan.id')
            ->where('tai_khoan.quyen_id', '=', '2')
            ->join('hoc_phan', 'hoc_phan.id', '=', 'nhom_hoc.hoc_phan_id')
            ->select('hoc_phan.ten as ten_hoc_phan', 'tai_khoan.ten as ten_giang_vien', 'nhom_hoc.id as nhom_hoc_id')
            ->get();
        //dd($data);
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
        //return $this->paginateObjectData($request, $data, 3, 1);
    }
    public function show(string $id)
    {
        $data = DB::table('nhom_hoc')
            ->where('nhom_hoc.id', '=', $id)
            ->join('tai_khoan', 'nhom_hoc.giang_vien_id', '=', 'tai_khoan.id')
            ->where('tai_khoan.quyen_id', '=', '2')
            ->join('hoc_phan', 'hoc_phan.id', '=', 'nhom_hoc.hoc_phan_id')
            ->select(
                'hoc_phan.ten as ten_hoc_phan',
                'tai_khoan.ten as ten_giang_vien',
                'nhom_hoc.stt_nhom as stt_nhom',
                'hoc_phan.id as ma_hoc_phan'
            )
            ->get();
        return $this->success($data, 200, 'Success');
    }
}
