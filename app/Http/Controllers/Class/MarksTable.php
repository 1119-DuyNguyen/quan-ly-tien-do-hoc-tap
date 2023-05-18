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
use Illuminate\Support\Facades\Response;

class MarksTable extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    public function show(string $nhom_hoc_id)
    {
        $data = DB::table('tai_khoan')
            ->join('tham_gia', 'tai_khoan.id', '=', 'tham_gia.sinh_vien_id')
            ->join('bai_dang', 'bai_dang.nhom_hoc_id', '=', 'tham_gia.nhom_hoc_id')
            ->where('bai_dang.nhom_hoc_id', '=', $nhom_hoc_id)
            ->select(
                'tai_khoan.id as id',
                'tai_khoan.ten as ten',
                'tham_gia.nhom_hoc_id as nhom',
                'bai_dang.id as bai_id'
            )
            ->get();
        return $this->success($data, 200, 'get');
    }
}