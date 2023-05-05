<?php

namespace App\Http\Controllers\Graduation\Student;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;


class SemesterController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $ds_bien_che = DB::table('bien_che')->get();

        $ngayHienTai = date('Y-m-d h:i:s');
        $ngayHienTai = date('Y-m-d h:i:s', strtotime($ngayHienTai));

        $hk_hien_tai = null;
        $hk_ke_tiep = null;

        // xác định sv đang ở hk hiện tại nào.
        for ($i = 0; $i < count($ds_bien_che); $i++) {
            $bien_che = $ds_bien_che[$i];
            $ngay_bat_dau = $bien_che->ngay_bat_dau;
            $ngay_ket_thuc = $bien_che->ngay_ket_thuc;
            if ((strtotime($ngayHienTai) >= strtotime($ngay_bat_dau)) && (strtotime($ngayHienTai) <= strtotime($ngay_ket_thuc))) {
                $hk_hien_tai = $bien_che;
                if ($i + 1 < count($ds_bien_che))
                    $hk_ke_tiep = $ds_bien_che[$i + 1];
                break;
            }
        }

        // tìm kỳ học gần nhất
        // https://stackoverflow.com/questions/15016725/how-to-get-closest-date-compared-to-an-array-of-dates-in-php
        function find_closest($ds_bien_che, $date)
        {
            //$count = 0;
            foreach ($ds_bien_che as $bien_che) {
                //$interval[$count] = abs(strtotime($date) - strtotime($day));
                $interval[] = abs(strtotime($date) - strtotime($bien_che->ngay_bat_dau));
                //$count++;
            }
            asort($interval);
            $closest = key($interval);

            return $closest;
        }

        if ($hk_hien_tai == null) {
            $curr = find_closest($ds_bien_che, $ngayHienTai);
            $hk_hien_tai = $ds_bien_che[$curr];
            if ($curr + 1 < count($ds_bien_che))
                $hk_ke_tiep = $ds_bien_che[$curr + 1];
        }

        $arr = array(
            "hk_hien_tai" => $hk_hien_tai,
            "hk_ke_tiep" => $hk_ke_tiep
        );
        return $this->success($arr, 200);
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
    public function show(Request $request, string $id)
    {
        
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
