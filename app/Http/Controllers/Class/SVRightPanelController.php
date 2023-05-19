<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Events\AnythingBePosted;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PaginationRequest;
use App\Models\Users\Classes\Posts\BaiDang;
use App\Models\Users\Classes\Posts\FileBaiDang;
use App\Models\Users\Classes\Posts\BaiTapSinhVien;

class SVRightPanelController extends ApiController
{
    public function index(PaginationRequest $request)
    {
        $data = DB::table('tai_khoan')
            ->join('tham_gia', 'tai_khoan.id', '=', 'tham_gia.sinh_vien_id')
            ->where('tham_gia.sinh_vien_id', '=', $request->user()->id)
            ->join('nhom_hoc', 'nhom_hoc.id', '=', 'tham_gia.nhom_hoc_id')
            ->join('bai_dang', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->select(
                'bai_dang.id as bai_dang_id',
                'bai_dang.nhom_hoc_id as nhom_hoc_id',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.noi_dung as noi_dung',
                'bai_dang.created_at as created_at',
                'bai_dang.ngay_ket_thuc as ngay_ket_thuc'
            )
            ->where('bai_dang.loai_noi_dung', '=', '2');
        //->get();
        //return json_encode($data);
        return $this->paginateMultipleTable($request, $data, null, ['bai_dang.created_at'], null, 3);
    }

    public function show(PaginationRequest $request, string $nhom_hoc_id)
    {
        $request['dir'] = 'desc';
        $data = DB::table('bai_dang')
            ->join('nhom_hoc', 'bai_dang.nhom_hoc_id', '=', 'nhom_hoc.id')
            ->where('nhom_hoc.id', '=', $nhom_hoc_id)
            ->select(
                'bai_dang.id as bai_dang_id',
                'bai_dang.tieu_de as tieu_de',
                'bai_dang.noi_dung as noi_dung',
                'bai_dang.created_at as created_at',
                'bai_dang.ngay_ket_thuc as ngay_ket_thuc'
            )
            ->where('bai_dang.loai_noi_dung', '=', '2');
        // ->get();
        //return dd($request->all());
        return $this->paginateMultipleTable($request, $data, null, ['bai_dang.created_at'], null, 3);
    }
}