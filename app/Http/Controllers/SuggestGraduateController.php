<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SuggestGraduateController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $lop_hoc_id = DB::table('tinh_trang_sinh_vien')->where('sinh_vien_id', $request->user()->id)->get('lop_hoc_id');

        if (count($lop_hoc_id) > 0)
            $lop_hoc_id = $lop_hoc_id[0]->lop_hoc_id;
        else
            return $this->error("Không tìm thấy lớp học", 404, 'not found');

        $chtr_dao_tao_id = DB::table('lop_hoc')->where('id', $lop_hoc_id)->get('chuong_trinh_dao_tao_id')[0]->chuong_trinh_dao_tao_id;
        $thoi_gian_vao_hoc = DB::table('lop_hoc')->where('id', $lop_hoc_id)->get('thoi_gian_vao_hoc')[0]->thoi_gian_vao_hoc;

        $ds_khoi_kt = DB::table('khoi_kien_thuc')->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)->get('id');

        $ds_bien_che = DB::table('bien_che')->get();

        $ngayHienTai = date('Y-m-d h:i:s');
        $ngayHienTai = date('Y-m-d h:i:s', strtotime($ngayHienTai));

        // $ds_bien_che_theo_ngay_vao_hoc = DB::table('bien_che')->where('ngay_bat_dau', '>', $thoi_gian_vao_hoc, 'and')->where('ngay_ket_thuc', '<', $ngayHienTai)->get();

        $hk_hien_tai = null;
        $hk_ke_tiep = null;

        // xác định sv đang ở hk hiện tại nào.
        for ($i = 0; $i < count($ds_bien_che); $i++) {
            $bien_che = $ds_bien_che[$i];
            $ngay_bat_dau = $bien_che->ngay_bat_dau;
            $ngay_ket_thuc = $bien_che->ngay_ket_thuc;
            if ((strtotime($ngayHienTai) >= strtotime($ngay_bat_dau)) && (strtotime($ngayHienTai) <= strtotime($ngay_ket_thuc)))
            {
                $hk_hien_tai = $bien_che;
                if ($i + 1 < count($ds_bien_che))
                    $hk_ke_tiep = $ds_bien_che[$i+1];
                break;
            }
        }

        // tìm kỳ học gần nhất
        // https://stackoverflow.com/questions/15016725/how-to-get-closest-date-compared-to-an-array-of-dates-in-php
        function find_closest($ds_bien_che, $date)
        {
            //$count = 0;
            foreach($ds_bien_che as $bien_che)
            {
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
            if ($curr+1 < count($ds_bien_che))
                $hk_ke_tiep = $ds_bien_che[$curr+1];
        }

        $hk_chinh = false;

        if ($hk_hien_tai != null) {
            // xác định được học kỳ hiện tại
            
            if ($hk_ke_tiep != null) {
                
                if ($hk_ke_tiep->ky_he == 0)
                    // hk chính
                    $hk_chinh = true;
                else
                    // hk hè
                    $hk_chinh = false;
                
            } else
                $hk_chinh = true;

        } else {
            // kỳ kế là học kỳ chính
            $hk_chinh = true;
        }

        $ds_kq = DB::table('ket_qua')->where('sinh_vien_id', $request->user()->id)->get();
        $GLOBALS['ds_kq'] = $ds_kq; 

        $filter_hp = function ($hp) {
            $ds_kq = $GLOBALS['ds_kq'];

            if (count($ds_kq) == 0)
                return true;

            foreach ($ds_kq as $hpkq) {
                // nếu môn đã học rồi và đã qua môn
                if ($hpkq->hoc_phan_id == $hp->hoc_phan_id && $hpkq->qua_mon == 1)
                    return false;
                
                if ($hpkq->hoc_phan_id == $hp->hoc_phan_id && $hpkq->qua_mon == 0)
                    $hp->qua_mon = 0;
                
            }
            return true;
        };

        $dshp = new Collection();

        if ($hk_chinh) {
            // kỳ kế tiếp là học kỳ chính

            $ds_bien_che_theo_ngay_vao_hoc = count(DB::table('bien_che')->where('ngay_bat_dau', '>=', $thoi_gian_vao_hoc)->where('ngay_ket_thuc', '<=', $ngayHienTai, 'and')->where('ky_he', 0)->get())+1;

            $hk_ke = 0;

            // 2 (hè) 3
            // 2 (hè) 3 4
            if ($hk_hien_tai->ky_he == 0)
                $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 2;
            else
                $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 1;

            $ds_kkt = DB::table('khoi_kien_thuc')->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)->get('id');

            $dshp_goiy_bb = new Collection();
            $dshp_goiy_tuchon = new Collection();

            foreach($ds_kkt as $kkt) {
                $dshp_goiy_bb_theokkt = DB::table('hoc_phan_kkt_bat_buoc')->where('khoi_kien_thuc_id', $kkt->id)->get();
                $dshp_goiy_tuchon_theokkt = DB::table('hoc_phan_kkt_tu_chon')->where('khoi_kien_thuc_id', $kkt->id)->get();

                $dshp_goiy_bb = $dshp_goiy_bb->merge($dshp_goiy_bb_theokkt->filter($filter_hp));
                $dshp_goiy_tuchon = $dshp_goiy_tuchon->merge($dshp_goiy_tuchon_theokkt->filter($filter_hp));
            }

            // dd($dshp_goiy_bb, $dshp_goiy_tuchon);

            foreach ($dshp_goiy_bb as $hp) {
                if ($hp->hoc_ky_goi_y == $hk_ke) {
                    $dshp->add($hp);
                    continue;
                }
                if (property_exists($hp, 'qua_mon'))
                    $dshp->add($hp);
            }

            foreach ($dshp_goiy_tuchon as $hp) {
                if ($hp->hoc_ky_goi_y == $hk_ke) {
                    $dshp->add($hp);
                    continue;
                }
                if (property_exists($hp, 'qua_mon'))
                    $dshp->add($hp);
            }

        } else {
            // kỳ kế tiếp là hk hè
            $lkt_gddc_id = DB::table('loai_kien_thuc')->where('dai_cuong', 1)->get('id')[0]->id;

            $kkt_gddc_id = DB::table('khoi_kien_thuc')->where('loai_kien_thuc_id', $lkt_gddc_id, 'and')->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)->get('id')[0]->id;

            $dshp_bb = DB::table('hoc_phan_kkt_bat_buoc')->where('khoi_kien_thuc_id', $kkt_gddc_id)->get('hoc_phan_id');
            $dshp_tuchon = DB::table('hoc_phan_kkt_tu_chon')->where('khoi_kien_thuc_id', $kkt_gddc_id)->get('hoc_phan_id');

            $dshp_bb = $dshp_bb->filter($filter_hp);
            $dshp_tuchon = $dshp_tuchon->filter($filter_hp);

            $dshp = $dshp_bb->merge($dshp_tuchon);
            $dshp = $dshp->unique();
        }

        $object = (object) array(
            'goi_y' => $dshp,
            'hoc_ky_hien_tai' => $hk_hien_tai,
            'hoc_ky_ke_la_hk_chinh' => $hk_chinh
        );

        return $this->success($object, 200, 'success');
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
