<?php

namespace App\Http\Services;

use App\Http\Requests\PaginationRequest;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AnalyticsService {
    use ApiResponser;

    private $dssv;
    private $ds_moc_thoi_gian;
    private $object;
    private $tt_lop_chi_tiet = false;
    private $dssv_columns = array( "tinh_trang_sinh_vien.sinh_vien_id",
    "tai_khoan.ten",
    "tai_khoan.ten_dang_nhap",
    "tinh_trang_sinh_vien.lop_hoc_id",
    "nam_ket_thuc",
    "thoi_gian_ket_thuc",
    "da_tot_nghiep",
    "so_lan_canh_cao",
    "buoc_thoi_hoc",
    "moc_thoi_gian_id",
    "chuong_trinh_dao_tao.nganh_id",
    "khoa.id as khoa_id");

    private function dssvTable() {
        return DB::table("tinh_trang_sinh_vien")
        ->join("tai_khoan", "tinh_trang_sinh_vien.sinh_vien_id", "=", "tai_khoan.id")
        ->join("lop_hoc", "tinh_trang_sinh_vien.lop_hoc_id", "=", "lop_hoc.id")
        ->join("chuong_trinh_dao_tao", "lop_hoc.chuong_trinh_dao_tao_id", "=", "chuong_trinh_dao_tao.id")
        ->join("chu_ky", "chuong_trinh_dao_tao.chu_ky_id", "=", "chu_ky.id")
        ->join("nganh", "chuong_trinh_dao_tao.nganh_id", "=", "nganh.id")
        ->join("khoa", "nganh.khoa_id", "=", "khoa.id")
        ->select($this->dssv_columns);
    }

    public function main(PaginationRequest $request) {
        $this->tk_chung($request);

        if ($request->input("nganh") !== null) {
            $this->tk_nganh($request);
        } else if ($request->input("khoa") !== null) {
            $this->tk_khoa($request);
        } else if ($request->input("lop") !== null) {
            return $this->tk_lop($request, false);
        } else if ($request->input("tt_lop") !== null) {
            return $this->tk_lop($request, true);
        } else if ($request->input("sv") !== null) {
            return $this->tk_sv($request, 0);
        }

        return $this->success($this->object, 200, "");
    }

    private function getNumOfSinhVien(int $tieu_chi_id, string $type) {
        switch ($type) {
            case 'khoa':
                $type = "khoa_id";
                break;
            case 'nganh':
                $type = "nganh_id";
                break;
            case 'lop':
                $type = "lop_hoc_id";
                break;
            
            default:
                $type = "";
                break;
        }

        $obj = array();

        if ($type == 'lop_hoc_id') {
            $obj = $this->getData($type, $tieu_chi_id, null);
        } else {
            foreach ($this->ds_moc_thoi_gian as $moc_thoi_gian) {
                $obj[$moc_thoi_gian->id] = $this->getData($type, $tieu_chi_id, $moc_thoi_gian);
            }
        }

        return $obj;
    }

    private function getData($type, $tieu_chi_id, $moc_thoi_gian) {
        $sv_tre_han = 0;
        $sv_tong = 0;
        $sv_da_tot_nghiep = 0;
        $sv_bi_canh_cao = 0;
        $sv_bi_bth = 0;

        $dssv = array();
        foreach ($this->dssv as $sv) {
            if ($type != "") {
                
                // get theo ngành || khoa
                if ($sv->{$type} == $tieu_chi_id) array_push($dssv, $sv);
                

            } else {
                // get theo mốc thời gian
                $dssv = $this->dssv;
                break;
            }
        }

        $stc = 0;
        foreach ($dssv as $sv) {
            $sv_tong++;
            
            if ($type != 'lop_hoc_id') {
                if ($sv->nam_ket_thuc < $moc_thoi_gian->nam && $sv->da_tot_nghiep == "0")
                    $sv_tre_han++;

                if ($sv->da_tot_nghiep == "1") {
                    if ($sv->moc_thoi_gian_id == $moc_thoi_gian->id) {
                        $sv_da_tot_nghiep++;
                        continue;
                    }
                }
            }

            if ($sv->buoc_thoi_hoc == "1")
                $sv_bi_bth++;

            if ($sv->so_lan_canh_cao > 0)
                $sv_bi_canh_cao++;

            if ($type == 'lop_hoc_id') {

                if ($sv->da_tot_nghiep == "1") {
                    $sv_da_tot_nghiep++;
                }

                if ($sv->thoi_gian_ket_thuc < date("Y-m-d H:i:s"))
                    $sv_tre_han++;

                $ds_hp = DB::table("ket_qua")
                ->join("hoc_phan", 'ket_qua.hoc_phan_id', '=', 'hoc_phan.id')
                ->where('sinh_vien_id', '=', $sv->sinh_vien_id)->get(array('so_tin_chi', 'co_tinh_tich_luy', 'qua_mon'));

                foreach($ds_hp as $hp) {
                    if ($hp->qua_mon == 1 && $hp->co_tinh_tich_luy == 1) 
                        $stc += $hp->so_tin_chi;
                }
            }
        }

        $stc_trung_binh = 0;
        if ($sv_tong > 0)
            $stc_trung_binh = ceil($stc / $sv_tong);

        $arr = array(
            "tong_sv" => $sv_tong,
            "sv_tot_nghiep" => $sv_da_tot_nghiep,
            "sv_chua_tot_nghiep" => $sv_tong - $sv_da_tot_nghiep,
            "sv_tre_han" => $sv_tre_han,
            "sv_bi_canh_cao" => $sv_bi_canh_cao,
            "sv_bi_bth" => $sv_bi_bth,
            "stc_trung_binh" => $stc_trung_binh,
            "sv_dat_dk_tot_nghiep" => 0
        );

        if ($type == 'lop_hoc_id' && $this->tt_lop_chi_tiet == true)
            $arr['dssv'] = $dssv;

        return $arr;
    }

    private function tk_chung() {

        $tong_so_sv = $this->dssvTable()->get()->count();
        $so_sv_tot_nghiep = $this->dssvTable()->where('da_tot_nghiep', '=', '1')->get()->count();
        $so_sv_chua_tot_nghiep = $tong_so_sv - $so_sv_tot_nghiep;

        $so_sv_bi_canh_cao = $this->dssvTable()->where('so_lan_canh_cao', '>', '0')->get()->count();
        $so_sv_bi_bth = $this->dssvTable()->where('buoc_thoi_hoc', '=', '1')->get()->count();

        $dssv = $this->dssvTable()->get();

        $this->dssv = $dssv;

        $so_sv_tre_han = 0;

        foreach ($dssv as $sv) {
            if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                $so_sv_tre_han++;
        }

        // Xác định đối với từng đợt (tất cả)

        $ds_moc_thoi_gian = DB::table("moc_thoi_gian_tot_nghiep")->get();
        $this->ds_moc_thoi_gian = $ds_moc_thoi_gian;
        $ds_khoa = DB::table("khoa")->get();
        $ds_nganh = DB::table("nganh")->get();

        $this->object = (object) array(
            "tong_sv" => $tong_so_sv,
            "sv_tot_nghiep" => $so_sv_tot_nghiep,
            "sv_chua_tot_nghiep" => $so_sv_chua_tot_nghiep,
            "sv_tre_han" => $so_sv_tre_han,
            "sv_bi_canh_cao" => $so_sv_bi_canh_cao,
            "sv_bi_bth" => $so_sv_bi_bth,
            "moc_thoi_gian_tot_nghiep" => $ds_moc_thoi_gian,
            "dot" => (object) $this->getNumOfSinhVien(-1, ""),
            "khoa" => (object) $ds_khoa,
            "nganh" => (object) $ds_nganh,
        );
    }

    private function tk_nganh(PaginationRequest $request) {
        $nganh_id = $request->input("nganh");

        $nganh_id = intval($nganh_id);

        $this->object->tong_sv = $this->dssvTable()->where('nganh_id', '=', $nganh_id)->get()->count();
        $this->object->sv_tot_nghiep = $this->dssvTable()->where('nganh_id', '=', $nganh_id)->where('da_tot_nghiep', '=', '1')->get()->count();
        $this->object->sv_chua_tot_nghiep = $this->object->tong_sv - $this->object->sv_tot_nghiep;
        $this->object->sv_tre_han = 0;

        $this->object->sv_bi_canh_cao = $this->dssvTable()->where('nganh_id', '=', $nganh_id)->where('so_lan_canh_cao', '>=', '1')->count();
        $this->object->sv_bi_bth = $this->dssvTable()->where('nganh_id', '=', $nganh_id)->where('buoc_thoi_hoc', '=', '1')->count();;

        foreach ($this->dssvTable()->where('nganh_id', '=', $nganh_id)->select("*")->get() as $sv) {
            if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                $this->object->sv_tre_han++;
        }

        $this->object->dot = $this->getNumOfSinhVien($nganh_id, "nganh");
    }

    private function tk_khoa(PaginationRequest $request) {
        $khoa_id = $request->input("khoa");

        $khoa_id = intval($khoa_id);

        $this->object->tong_sv = $this->dssvTable()->where('nganh.khoa_id', '=', $khoa_id)->get()->count();
        $this->object->sv_tot_nghiep = $this->dssvTable()->where('nganh.khoa_id', '=', $khoa_id)->where('da_tot_nghiep', '=', '1')->get()->count();

        $this->object->sv_chua_tot_nghiep = $this->object->tong_sv - $this->object->sv_tot_nghiep;
        $this->object->sv_tre_han = 0;

        $this->object->sv_bi_canh_cao = $this->dssvTable()->where('nganh.khoa_id', '=', $khoa_id)->where('so_lan_canh_cao', '>=', '1')->count();
        $this->object->sv_bi_bth = $this->dssvTable()->where('nganh.khoa_id', '=', $khoa_id)->where('da_tot_nghiep', '=', '1')->count();
        
        foreach ($this->dssvTable()->where('nganh.khoa_id', '=', $khoa_id)->select("*")->get() as $sv) {
            if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                $this->object->sv_tre_han++;
        }

        $this->object->dot = $this->getNumOfSinhVien($khoa_id, "khoa");

        $ds_lop = DB::table('lop_hoc')
        ->join('chuong_trinh_dao_tao', 'chuong_trinh_dao_tao_id', '=', 'chuong_trinh_dao_tao.id')
        ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', '=', 'nganh.id')
        ->where('khoa_id', '=', $khoa_id)
        ->get(array('lop_hoc.id', 'ma_lop', 'ten_lop', 'so_luong_sinh_vien'));

        $this->object->ds_lop = $ds_lop;
    }

    private function tk_lop(PaginationRequest $request, bool $tt_chi_tiet) {
        if (!$tt_chi_tiet)
            $lop_str = $request->input("lop");
        else 
            $lop_str = $request->input("tt_lop");

        $this->tt_lop_chi_tiet = $tt_chi_tiet;

        if (!$tt_chi_tiet)
            $lop_list = DB::table("lop_hoc")->where('ma_lop', 'LIKE', "%$lop_str%")->get(array('ma_lop','id'));
        else 
            $lop_list = DB::table("lop_hoc")->where('ma_lop', 'LIKE', "%$lop_str%")->get(array('ma_lop','id'))->first();

        $tt_lop_list = new Collection();

        if ($lop_list === null)
            return $this->error("", 404, "Không tìm thấy lớp");

        foreach($lop_list as $lop) {
            if (!$tt_chi_tiet)
                $tt_lop_list->add($this->getNumOfSinhVien($lop->id, "lop"));
            else
            {
                $tt_lop_list->add($this->getNumOfSinhVien($lop_list->id, "lop"));
                break;
            }
        }

        if (DB::table("lop_hoc")->where('ma_lop', 'LIKE', "%$lop_str%")->get(array('ma_lop','id'))->count() == 0)
            return $this->error("", 404, "");

        return $this->success((object) array(
            "lop" => $lop_list,
            "noi_dung_lop" => $tt_lop_list
        ), 200, "");
    }

    private function getHPList(int $sinh_vien_id) {
        $result = DB::table("tinh_trang_sinh_vien")
        ->where('tinh_trang_sinh_vien.sinh_vien_id', '=', $sinh_vien_id)
        ->join('lop_hoc', 'tinh_trang_sinh_vien.lop_hoc_id', '=', 'lop_hoc.id')->get('chuong_trinh_dao_tao_id')->first();

        if ($result === null)
            $chuong_trinh_dao_tao_id = -1;
        else
            $chuong_trinh_dao_tao_id = $result->chuong_trinh_dao_tao_id;

        $ten_ctdt = DB::table("chuong_trinh_dao_tao")
        ->where('id', '=', $chuong_trinh_dao_tao_id)->get('ten')->first()->ten;

        $ds_khoi_kien_thuc = DB::table('khoi_kien_thuc')
        ->where('chuong_trinh_dao_tao_id', '=', $chuong_trinh_dao_tao_id)
        ->get(array('id','ten'));

        $object = array(
            'ten_ctdt' => $ten_ctdt,
        );

        foreach($ds_khoi_kien_thuc as $kkt) {
            $ds_hp_batbuoc = DB::table('hoc_phan_kkt_bat_buoc')
            ->where('khoi_kien_thuc_id', '=', $kkt->id)
            ->join('hoc_phan', 'hoc_phan_id', '=', 'hoc_phan.id')
            ->select(array('hoc_phan_id', 'ma_hoc_phan', 'ten', 'so_tin_chi'))
            ->groupBy('hoc_phan_id')
            ->get();
            
            $ds_hp_tuchon = DB::table('hoc_phan_kkt_tu_chon')
            ->where('khoi_kien_thuc_id', '=', $kkt->id)
            ->join('hoc_phan', 'hoc_phan_id', '=', 'hoc_phan.id')
            ->select(array('hoc_phan_id', 'ma_hoc_phan', 'ten', 'so_tin_chi'))
            ->groupBy('hoc_phan_id')
            ->get();

            $object[] = (object) array(
                "ten" => $kkt->ten,
                "ds_hp_batbuoc" => $ds_hp_batbuoc,
                "ds_hp_tuchon" => $ds_hp_tuchon,
            );
        }

        return $object;
    }

    public function tk_sv(PaginationRequest $request, int $sv_id) {
        
        if ($sv_id == 0)
            $search_sv_txt = $request->input("sv");

        $internalRequest = Request::create('/api/semester', 'GET');

        $response = app()->handle($internalRequest);
        $response = json_decode($response->getContent())->data;

        $hk_truoc = $response->hk_truoc;
        $hk_hien_tai = $response->hk_hien_tai;

        if ($sv_id == 0)
            $result = DB::table('tai_khoan')
            ->where('ten_dang_nhap', 'LIKE', "%$search_sv_txt%", "and")
            ->where('quyen_id', '=', 1)
            ->get(array('id', 
                        'ten', 
                        'ten_dang_nhap',
                        'email',
                        'sdt',
                        'ngay_sinh',
                        'gioi_tinh'))->first();
        else
            $result = DB::table('tai_khoan')
            ->where('id', '=', $sv_id)
            ->where('quyen_id', '=', 1)
            ->get(array('id', 
                        'ten', 
                        'ten_dang_nhap',
                        'email',
                        'sdt',
                        'ngay_sinh',
                        'gioi_tinh'))->first();
        
        if ($result) {
            
            $ds_hp = DB::table('ket_qua')
            ->join('hoc_phan', 'ket_qua.hoc_phan_id', '=', 'hoc_phan.id')
            ->where('sinh_vien_id', '=', $result->id)
            ->get(array('hoc_phan.id',
                        'ma_hoc_phan',
                        'diem_tong_ket',
                        'diem_he_4',
                        'qua_mon',
                        'so_tin_chi',
                        'co_tinh_tich_luy',
                        'bien_che_id'));

            $stc_dat = 0;
            $stc_chuadat = 0;
            $stc_dat_gannhat = 0;

            $stc_da_hoc_gan_nhat = 0;
            $dtb_hk_gan_nhat = 0;
            $dtb_hk4_gan_nhat = 0;

            foreach ($ds_hp as $hp) {
                if ($hp->diem_tong_ket !== null) {
                    $hp->qua_mon = 1;
                    if ($hp->diem_tong_ket < 4.0)
                    {
                        $hp->diem_he_4 = 0.0;
                        $hp->qua_mon = 0;
                    }
                    else if ($hp->diem_tong_ket >= 4.0 && $hp->diem_tong_ket < 5.5)
                        $hp->diem_he_4 = 1.0;
                    else if ($hp->diem_tong_ket >= 5.5 && $hp->diem_tong_ket < 7.0)
                        $hp->diem_he_4 = 2.0;
                    else if ($hp->diem_tong_ket >= 7.0 && $hp->diem_tong_ket < 8.5)
                        $hp->diem_he_4 = 3.0;
                    else if ($hp->diem_tong_ket >= 8.5)
                        $hp->diem_he_4 = 4.0;
                }
                if ($hp->qua_mon == 1 && $hp->co_tinh_tich_luy == 1)
                    $stc_dat += $hp->so_tin_chi;

                if ($hp->qua_mon == 0 && $hp->co_tinh_tich_luy == 1)
                    $stc_chuadat += $hp->so_tin_chi;

                if ($hp->qua_mon == 1 && $hp->co_tinh_tich_luy == 1 && $hp->bien_che_id == $hk_hien_tai->id)
                    $stc_dat_gannhat += $hp->so_tin_chi;
            }

            $hk_can_tinh = -1;
            if ($hk_truoc !== null) { // học kỳ trước tồn tại
                foreach ($ds_hp as $hp) {
                    if (
                        ($hp->diem_he_4 === null || $hp->diem_tong_ket === null)
                        &&
                        $hp->bien_che_id == $hk_hien_tai->id
                        ) {
                            // chưa nhập điểm
                            $hk_can_tinh = $hk_truoc->id;
                            break;
                    }
                }
                // đã nhập điểm
                if ($hk_can_tinh == -1) $hk_can_tinh = $hk_hien_tai->id;
            }

            if ($hk_can_tinh != -1) { // xác định được hk cần tính
                foreach($ds_hp as $hp) {
                    if ($hp->bien_che_id == $hk_can_tinh && $hp->co_tinh_tich_luy == 1) {
                        $stc_da_hoc_gan_nhat += $hp->so_tin_chi;
                        $dtb_hk4_gan_nhat += $hp->diem_he_4 * $hp->so_tin_chi;
                        $dtb_hk_gan_nhat += $hp->diem_tong_ket * $hp->so_tin_chi;
                    }
                }

                if ($stc_da_hoc_gan_nhat > 0) {
                    $dtb_hk4_gan_nhat /= $stc_da_hoc_gan_nhat;
                    $dtb_hk_gan_nhat /= $stc_da_hoc_gan_nhat;
                }
                
            }

            // tính điểm

            $ds_hp_toan_khoa = DB::select(
                "SELECT KQ.hoc_phan_id, sinh_vien_id, diem_tong_ket, diem_he_4, so_tin_chi FROM ket_qua KQ 
                INNER JOIN hoc_phan ON KQ.hoc_phan_id = hoc_phan.id
                LEFT OUTER JOIN (SELECT `hoc_phan_id`, max(`created_at`) as compare_create_at from ket_qua group by hoc_phan_id) _KQ 
                ON KQ.created_at = _KQ.compare_create_at AND KQ.hoc_phan_id = _KQ.hoc_phan_id 
                WHERE sinh_vien_id = $result->id AND hoc_phan.co_tinh_tich_luy = 1"
            );

            $tong_stc_da_hoc = 0;
            $tong_dtb_hk = 0;
            $tong_dtb_hk4 = 0;

            foreach ($ds_hp_toan_khoa as $hp) {
                $tong_stc_da_hoc += $hp->so_tin_chi;
                $tong_dtb_hk4 += $hp->diem_he_4 * $hp->so_tin_chi;
                $tong_dtb_hk += $hp->diem_tong_ket * $hp->so_tin_chi;
            }

            if ($tong_stc_da_hoc > 0) {
                $tong_dtb_hk /= $tong_stc_da_hoc;
                $tong_dtb_hk4 /= $tong_stc_da_hoc;
            }

            $object = (object) array(
                "id" => $result->id,
                "ten" => $result->ten,
                "ten_dang_nhap" => $result->ten_dang_nhap,
                "email" => $result->email,
                "sdt" => $result->sdt,
                "ngay_sinh" => $result->ngay_sinh,
                "gioi_tinh" => $result->gioi_tinh,

                "stc_dat" => $stc_dat,
                "stc_chuadat" => $stc_chuadat,
                "stc_dat_gannhat" => $stc_dat_gannhat,

                "dtb_hk_gan_nhat" => round($dtb_hk_gan_nhat, 2),
                "dtb_hk4_gan_nhat" => round($dtb_hk4_gan_nhat, 2),

                "tong_dtb_hk" => round($tong_dtb_hk, 2),
                "tong_dtb_hk4" => round($tong_dtb_hk4, 2),

                "dshp_sv" => $ds_hp,
                "dshp" => $this->getHPList($result->id)
            );
            
            return $this->success($object, 200, "");
        }

        return $this->error("", 404, "");
    }
}