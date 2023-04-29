<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tong_so_sv = count(DB::table("tai_khoan")->select("*")->where('quyen_id', '=', '1')->get());
        $so_sv_tot_nghiep = count(DB::table("tinh_trang_sinh_vien")->select("*")->where('da_tot_nghiep', '=', '1')->get());
        $so_sv_chua_tot_nghiep = $tong_so_sv - $so_sv_tot_nghiep;

        // Xác định sinh viên trễ hạn tốt nghiệp hay không.

        $dssv_chua_tot_nghiep = DB::table("tinh_trang_sinh_vien")
        ->join("lop_hoc", "tinh_trang_sinh_vien.lop_hoc_id", "=", "lop_hoc.id")
        ->join("chuong_trinh_dao_tao", "lop_hoc.chuong_trinh_dao_tao_id", "=", "chuong_trinh_dao_tao.id")
        ->join("chu_ky", "chuong_trinh_dao_tao.chu_ky_id", "=", "chu_ky.id")
        ->select("*")->where('da_tot_nghiep', '=', '0')->get();
        // dd(count($result));

        $so_sv_tre_han = 0;

        foreach ($dssv_chua_tot_nghiep as $sv) {
            if ($sv->nam_ket_thuc < date("Y")) $so_sv_tre_han++;
        }
        
        return  $this->success($so_sv_tre_han, 200, "success");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
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
    public function destroy(Request $request, string $id)
    {
        //
    }
}