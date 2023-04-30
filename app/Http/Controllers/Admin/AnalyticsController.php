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
        $so_sv_tot_nghiepTong = count(DB::table("tinh_trang_sinh_vien")->select("*")->where('da_tot_nghiep', '=', '1')->get());
        $so_sv_chua_tot_nghiepTong = $tong_so_sv - $so_sv_tot_nghiepTong;

        // Xác định sinh viên trễ hạn tốt nghiệp hay không.

        $dssv = DB::table("tinh_trang_sinh_vien")
        ->join("lop_hoc", "tinh_trang_sinh_vien.lop_hoc_id", "=", "lop_hoc.id")
        ->join("chuong_trinh_dao_tao", "lop_hoc.chuong_trinh_dao_tao_id", "=", "chuong_trinh_dao_tao.id")
        ->join("chu_ky", "chuong_trinh_dao_tao.chu_ky_id", "=", "chu_ky.id")
        ->select("*")->get();
        // dd(count($result));

        $so_sv_tre_hanTong = 0;

        foreach ($dssv as $sv) {
            if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                $so_sv_tre_hanTong++;
        }

        // Xác định đối với từng đợt

        $ds_moc_thoi_gian = DB::table("moc_thoi_gian_tot_nghiep")->get();
        $ds_moc_thoi_gianObj = array();
        
        foreach ($ds_moc_thoi_gian as $moc_thoi_gian) {
            $sv_tre_han = 0;
            $sv_tong = 0;
            $sv_da_tot_nghiep = 0;

            foreach ($dssv as $sv) {
                $sv_tong++;
                if ($sv->nam_ket_thuc < $moc_thoi_gian->nam && $sv->da_tot_nghiep == "0") {
                    $sv_tre_han++;
                    continue;
                }
                if ($sv->da_tot_nghiep == "1") {
                    if ($sv->moc_thoi_gian_id == $moc_thoi_gian->id) {
                        $sv_da_tot_nghiep++;
                        continue;
                    }
                }
            }


            $ds_moc_thoi_gianObj[$moc_thoi_gian->id] = array(
                "tong_sv" => $sv_tong,
                "sv_tot_nghiep" => $sv_da_tot_nghiep,
                "sv_chua_tot_nghiep" => $sv_tong - $sv_da_tot_nghiep,
                "sv_tre_han" => $sv_tre_han,
            );
        }

        $object = (object) array(
            "tong_sv" => $tong_so_sv,
            "sv_tot_nghiep" => $so_sv_tot_nghiepTong,
            "sv_chua_tot_nghiep" => $so_sv_chua_tot_nghiepTong,
            "sv_tre_han" => $so_sv_tre_hanTong,
            "moc_thoi_gian_tot_nghiep" => $ds_moc_thoi_gian,
            "dot" => (object) $ds_moc_thoi_gianObj
        );
        
        return  $this->success($object, 200, "success");
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