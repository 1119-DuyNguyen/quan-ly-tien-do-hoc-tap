<?php

namespace App\Http\Controllers\Class\Everyone;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;

class EveryoneController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('nhom_hoc')
            ->join('tham_gia', 'tham_gia.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->join('tai_khoan', 'tham_gia.sinh_vien_id', '=', 'tai_khoan.id')
            ->select('tai_khoan.ten as ten')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }
    public function show(string $nhom_hoc_id)
    {
        $data = DB::table('nhom_hoc')
            ->join('tham_gia', 'tham_gia.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->where('nhom_hoc_id', '=', $nhom_hoc_id)
            ->join('tai_khoan', 'tham_gia.sinh_vien_id', '=', 'tai_khoan.id')
            ->select('tai_khoan.ten as ten')
            ->get();
        //return json_encode($data);
        return $this->success($data, 200, 'Success');
    }
}