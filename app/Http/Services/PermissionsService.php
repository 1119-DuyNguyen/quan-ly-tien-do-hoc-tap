<?php

namespace App\Http\Services;

use App\Http\Requests\PaginationRequest;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class PermissionsService {
    use ApiResponser;

    public function getQuyen($ma_quyen) {
        $ketqua = DB::table('quyen')->where('id', '=', $ma_quyen)->get()->first();

        return $ketqua;
    }

    public function getDanhSachChucNang() {
        $ketqua = DB::table('chuc_nang')->get();

        return $ketqua;
    }

    public function getChucNangThuocQuyen($ma_quyen) {
        $ketqua = DB::table('chuc_nang_quyen')->where('quyen_id', '=', $ma_quyen)->get();

        return $ketqua;
    }
}