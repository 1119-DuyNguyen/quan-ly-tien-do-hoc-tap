<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        // Xác định sinh viên trễ hạn tốt nghiệp hay không.

        function dssvTable() {
            return DB::table("tinh_trang_sinh_vien")
            ->join("lop_hoc", "tinh_trang_sinh_vien.lop_hoc_id", "=", "lop_hoc.id")
            ->join("chuong_trinh_dao_tao", "lop_hoc.chuong_trinh_dao_tao_id", "=", "chuong_trinh_dao_tao.id")
            ->join("chu_ky", "chuong_trinh_dao_tao.chu_ky_id", "=", "chu_ky.id")
            ->join("nganh", "chuong_trinh_dao_tao.nganh_id", "=", "nganh.id")
            ->join("khoa", "nganh.khoa_id", "=", "khoa.id");
        }

        $tong_so_sv = dssvTable()->get()->count();
        $so_sv_tot_nghiep = dssvTable()->where('da_tot_nghiep', '=', '1')->get()->count();
        $so_sv_chua_tot_nghiep = $tong_so_sv - $so_sv_tot_nghiep;

        $so_sv_bi_canh_cao = dssvTable()->where('so_lan_canh_cao', '>', '0')->get()->count();
        $so_sv_bi_bth = dssvTable()->where('buoc_thoi_hoc', '=', '1')->get()->count();

        $dssv = dssvTable()->select("*")->get();
        $GLOBALS['dssv'] = $dssv;
        // dd(count($result));

        $so_sv_tre_han = 0;

        foreach ($dssv as $sv) {
            if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                $so_sv_tre_han++;
        }

        // Xác định đối với từng đợt (tất cả)

        $ds_moc_thoi_gian = DB::table("moc_thoi_gian_tot_nghiep")->get();
        $GLOBALS['ds_moc_thoi_gian'] = $ds_moc_thoi_gian;
        $ds_khoa = DB::table("khoa")->get();
        $ds_nganh = DB::table("nganh")->get();

        function getData($type, $tieu_chi_id, $moc_thoi_gian) {
            $sv_tre_han = 0;
            $sv_tong = 0;
            $sv_da_tot_nghiep = 0;
            $sv_bi_canh_cao = 0;
            $sv_bi_bth = 0;

            $dssv = array();
            foreach ($GLOBALS['dssv'] as $sv) {
                if ($type != "") {
                    
                    // get theo ngành || khoa
                    if ($sv->{$type} == $tieu_chi_id) array_push($dssv, $sv);
                    

                } else {
                    // get theo mốc thời gian
                    $dssv = $GLOBALS['dssv'];
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

            return $arr;
        }

        function getNumOfSinhVien(int $tieu_chi_id, string $type) {
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
                $obj = getData($type, $tieu_chi_id, null);
            } else {
                foreach ($GLOBALS['ds_moc_thoi_gian'] as $moc_thoi_gian) {
                    $obj[$moc_thoi_gian->id] = getData($type, $tieu_chi_id, $moc_thoi_gian);
                }
            }

            return $obj;
        }

        $object = (object) array(
            "tong_sv" => $tong_so_sv,
            "sv_tot_nghiep" => $so_sv_tot_nghiep,
            "sv_chua_tot_nghiep" => $so_sv_chua_tot_nghiep,
            "sv_tre_han" => $so_sv_tre_han,
            "sv_bi_canh_cao" => $so_sv_bi_canh_cao,
            "sv_bi_bth" => $so_sv_bi_bth,
            "moc_thoi_gian_tot_nghiep" => $ds_moc_thoi_gian,
            "dot" => (object) getNumOfSinhVien(-1, ""),
            "khoa" => (object) $ds_khoa,
            "nganh" => (object) $ds_nganh,
        );

        if ($request->input("nganh") !== null) {
            $nganh_id = $request->input("nganh");

            $nganh_id = intval($nganh_id);

            $object->tong_sv = dssvTable()->where('nganh_id', '=', $nganh_id)->get()->count();
            $object->sv_tot_nghiep = dssvTable()->where('nganh_id', '=', $nganh_id)->where('da_tot_nghiep', '=', '1')->get()->count();
            $object->sv_chua_tot_nghiep = $object->tong_sv - $object->sv_tot_nghiep;
            $object->sv_tre_han = 0;
            foreach (dssvTable()->where('nganh_id', '=', $nganh_id)->select("*")->get() as $sv) {
                if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                    $object->sv_tre_han++;
            }

            $object->dot = getNumOfSinhVien($nganh_id, "nganh");
        } else if ($request->input("khoa") !== null) {
            $khoa_id = $request->input("khoa");

            $khoa_id = intval($khoa_id);

            $object->tong_sv = dssvTable()->where('khoa_id', '=', $khoa_id)->get()->count();
            $object->sv_tot_nghiep = dssvTable()->where('khoa_id', '=', $khoa_id)->where('da_tot_nghiep', '=', '1')->get()->count();

            $object->sv_chua_tot_nghiep = $object->tong_sv - $object->sv_tot_nghiep;
            $object->sv_tre_han = 0;
            
            foreach (dssvTable()->where('khoa_id', '=', $khoa_id)->select("*")->get() as $sv) {
                if ($sv->nam_ket_thuc < date("Y") && $sv->da_tot_nghiep == "0") 
                    $object->sv_tre_han++;
            }

            $object->dot = getNumOfSinhVien($khoa_id, "khoa");
        } else if ($request->input("lop") !== null) {
            $lop_str = $request->input("lop");

            $lop_list = DB::table("lop_hoc")->where('ma_lop', 'LIKE', "%$lop_str%")->get(array('ma_lop','id'));
            $tt_lop_list = new Collection();
            foreach($lop_list as $lop) {
                $tt_lop_list->add(getNumOfSinhVien($lop->id, "lop"));
            }

            return $this->success($tt_lop_list, 200, "");
        }
        
        return $this->success($object, 200, "");
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