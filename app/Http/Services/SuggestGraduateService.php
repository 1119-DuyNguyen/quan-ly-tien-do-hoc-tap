<?php

namespace App\Http\Services;

use App\Traits\ApiResponser;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class SuggestGraduateService {
    use ApiResponser;

    public function main($request) {
        
        $lop_hoc_id = DB::table('tinh_trang_sinh_vien')->where('sinh_vien_id', $request->user()->id)->get('lop_hoc_id');

        if (count($lop_hoc_id) > 0)
            $lop_hoc_id = $lop_hoc_id[0]->lop_hoc_id;
        else
            return $this->error("Không tìm thấy lớp học", 404, 'not found');

        $chtr_dao_tao_id = DB::table('lop_hoc')->where('id', $lop_hoc_id)->get('chuong_trinh_dao_tao_id')[0]->chuong_trinh_dao_tao_id;
        $thoi_gian_vao_hoc = DB::table('lop_hoc')->where('id', $lop_hoc_id)->get('thoi_gian_vao_hoc')[0]->thoi_gian_vao_hoc;

        $ngayHienTai = date('Y-m-d h:i:s');
        $ngayHienTai = date('Y-m-d h:i:s', strtotime($ngayHienTai));

        $hk_hien_tai = null;
        $hk_ke_tiep = null;

        $internalRequest = Request::create('/api/semester', 'GET');

        $response = app()->handle($internalRequest);
        $response = json_decode($response->getContent())->data;

        $hk_truoc = $response->hk_truoc;
        $hk_hien_tai = $response->hk_hien_tai;
        $hk_ke_tiep = $response->hk_ke_tiep;

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

        function themMonHienTai($request, $hp, $hk_ke) {

            $dshp_truoc = DB::table('dieu_kien_tien_quyet')
                ->where('hoc_phan_id', '=', $hp->hoc_phan_id)
                ->get(array('hoc_phan_truoc_id'));

            if ($dshp_truoc !== null) {
                foreach($dshp_truoc as $hp_truoc) {

                    $kqhp_truoc = DB::table('ket_qua')
                    ->where('hoc_phan_id', '=', $hp_truoc->hoc_phan_truoc_id)
                    ->where('sinh_vien_id', '=', $request->user()->id)
                    ->get()->first();

                    if ($kqhp_truoc !== null) {
                        if ($kqhp_truoc->qua_mon == 1 && $hk_ke == -1)
                            return 1;
                        if ($kqhp_truoc->qua_mon == 1 && intval($hp->hoc_ky_goi_y) % 2 == intval($hk_ke) % 2 && intval($hp->hoc_ky_goi_y) - intval($hk_ke) <= 2)
                            return 1;
                        if ($kqhp_truoc->qua_mon == 0)
                            return 0;
                    } else return 0;
                    
                }
            }

            return -1;
        }

        if ($hk_chinh) {
            // kỳ kế tiếp là học kỳ chính

            $ds_bien_che_theo_ngay_vao_hoc = DB::table('bien_che')->where('ngay_bat_dau', '>=', $thoi_gian_vao_hoc)->where('ngay_ket_thuc', '<=', $ngayHienTai, 'and')->where('ky_he', 0)->count() + 1;

            $hk_ke = 0;

            // 2 (hè) 3
            // 2 (hè) 3 4
            if ($hk_ke_tiep !== null)
            {
                if ($hk_hien_tai->ky_he == 0 && $hk_ke_tiep->ky_he == 1)
                    $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 2;
                else
                    $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 1;
            } else if ($hk_truoc !== null) {
                if ($hk_hien_tai->ky_he == 0 && $hk_truoc->ky_he == 1)
                    $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 1;
                else if ($hk_hien_tai->ky_he == 1)
                    $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 1;
                else 
                    $hk_ke = $ds_bien_che_theo_ngay_vao_hoc + 2;
            } else $hk_ke = -1;

            $ds_kkt = DB::table('khoi_kien_thuc')->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)->get('id');

            $dshp_goiy_bb = new Collection();
            $dshp_goiy_tuchon = new Collection();

            foreach ($ds_kkt as $kkt) {
                $dshp_goiy_bb_theokkt = DB::table('hoc_phan_kkt_bat_buoc')->where('khoi_kien_thuc_id', $kkt->id)->get();
                $dshp_goiy_tuchon_theokkt = DB::table('hoc_phan_kkt_tu_chon')->where('khoi_kien_thuc_id', $kkt->id)->get();

                $dshp_goiy_bb = $dshp_goiy_bb->merge($dshp_goiy_bb_theokkt->filter($filter_hp));
                $dshp_goiy_tuchon = $dshp_goiy_tuchon->merge($dshp_goiy_tuchon_theokkt->filter($filter_hp));
            }

            foreach ($dshp_goiy_bb as $hp) {

                $check_dktq = themMonHienTai($request, $hp, $hk_ke);

                if ($check_dktq === 1)
                {
                    $dshp->add($hp);
                    continue;
                }

                if ($check_dktq === 0)
                    continue;

                if (intval($hp->hoc_ky_goi_y) % 2 == intval($hk_ke) % 2 && intval($hp->hoc_ky_goi_y) - intval($hk_ke) <= 2) {
                    $dshp->add($hp);
                    continue;
                }
                if (property_exists($hp, 'qua_mon'))
                    $dshp->add($hp);
                
                if ($hp->hoc_phan_id == 63)
                    dd($hp, $hp->hoc_ky_goi_y, $hk_ke);
            }

            foreach ($dshp_goiy_tuchon as $hp) {

                $check_dktq = themMonHienTai($request, $hp, $hk_ke);

                if ($check_dktq === 1)
                {
                    $dshp->add($hp);
                    continue;
                }

                if ($check_dktq === 0)
                    continue;

                if (intval($hp->hoc_ky_goi_y) == -1) {
                    $dshp->add($hp);
                    continue;
                }

                if (intval($hp->hoc_ky_goi_y) % 2 == intval($hk_ke) % 2 && intval($hp->hoc_ky_goi_y) - intval($hk_ke) <= 2) {
                    $dshp->add($hp);
                    continue;
                }
                if (property_exists($hp, 'qua_mon'))
                    $dshp->add($hp);
            }

            $dshp = $dshp->unique('hoc_phan_id');
        } else {
            // kỳ kế tiếp là hk hè
            if (DB::table('khoi_kien_thuc')
            ->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)
            ->where('dai_cuong', '=', 1)
            ->get('khoi_kien_thuc.id')->count() == 0)
                $kkt_gddc_id = -1;
            else
                $kkt_gddc_id = DB::table('khoi_kien_thuc')
                ->where('chuong_trinh_dao_tao_id', $chtr_dao_tao_id)
                ->where('dai_cuong', '=', 1)
                ->get('khoi_kien_thuc.id')->first()->id;

            $dshp_bb = DB::table('hoc_phan_kkt_bat_buoc')->where('khoi_kien_thuc_id', $kkt_gddc_id)->get('hoc_phan_id');
            $dshp_tuchon = DB::table('hoc_phan_kkt_tu_chon')->where('khoi_kien_thuc_id', $kkt_gddc_id)->get('hoc_phan_id');

            $dshp_bb = $dshp_bb->filter($filter_hp);
            $dshp_tuchon = $dshp_tuchon->filter($filter_hp);

            $dshp = $dshp_bb->merge($dshp_tuchon);
            $dshp = $dshp->unique('hoc_phan_id');

            $dshp_after_checked = new Collection();
            foreach ($dshp as $hp) {
                $check_dktq = themMonHienTai($request, $hp, -1);

                if ($check_dktq === 1)
                {
                    $dshp_after_checked->add($hp);
                    continue;
                }

                if ($check_dktq === 0)
                    continue;

                if (property_exists($hp, 'qua_mon'))
                {
                    $dshp_after_checked->add($hp);
                    continue;
                }

                if ($check_dktq === -1)
                    $dshp_after_checked->add($hp);
            }

            $dshp = $dshp_after_checked;
        }

        foreach ($dshp as $hp) {
            $kq_tu_db = DB::table('hoc_phan')->where('id', $hp->hoc_phan_id)->get()->first();

            $hp->ten = $kq_tu_db->ten;
            $hp->so_tin_chi = $kq_tu_db->so_tin_chi;
            $hp->phan_tram_giua_ki = $kq_tu_db->phan_tram_giua_ki;
            $hp->phan_tram_cuoi_ki = $kq_tu_db->phan_tram_cuoi_ki;
            $hp->ma_hoc_phan = $kq_tu_db->ma_hoc_phan;
        }

        $object = (object) array(
            'goi_y' => $dshp,
            'hoc_ky_hien_tai' => $hk_hien_tai,
            'hoc_ky_ke_la_hk_chinh' => $hk_chinh
        );
        
        return $this->success($object, 200);
    }
}