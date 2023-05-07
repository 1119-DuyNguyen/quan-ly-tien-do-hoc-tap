<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;

class ThamGiaController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        $data = DB::table('tham_gia')
            ->join('bai_tap_sinh_vien', 'tham_gia.sinh_vien_id', '=', 'bai_tap_sinh_vien.sinh_vien_id')
            ->get();
        //dd($data);
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
        //return $this->paginateObjectData($request, $data, 3, 1);
    }
    public function show(string $id)
    {
        $dssv_thamgia = DB::table('tham_gia')
            ->join('tai_khoan', 'tai_khoan.id', '=', 'tham_gia.sinh_vien_id')
            ->join('bai_dang', 'bai_dang.nhom_hoc_id', '=', 'tham_gia.nhom_hoc_id')
            ->where('bai_dang.id', '=', $id)
            ->get(array('tham_gia.sinh_vien_id as sinh_vien_id',
                        'tai_khoan.ten as ten_sinh_vien'));
        
        $dsbt = DB::table('bai_tap_sinh_vien')
            ->join('tai_khoan', 'tai_khoan.id', '=', 'bai_tap_sinh_vien.sinh_vien_id')
            ->where('bai_tap_id', '=', $id)
            ->get(array('tai_khoan.id as sinh_vien_id',
                        'tai_khoan.ten as ten_sinh_vien',
                        'link_file',
                        'diem'));;

        $object = (object) array(
            "dssv_tham_gia" => $dssv_thamgia,
            "dsbt" => $dsbt
        );
        return $this->success($object, 200, 'Success');
    }
}
