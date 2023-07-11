<?php

namespace App\Http\Services;

use App\Http\Requests\PaginationRequest;
use Illuminate\Support\Str;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cookie;

class GetListStudentsService {
    use ApiResponser;

    private $dssv_columns = array( "tinh_trang_sinh_vien.sinh_vien_id",
    "tai_khoan.ten",
    "tai_khoan.ten_dang_nhap",
    "tinh_trang_sinh_vien.lop_hoc_id",
    "thoi_gian_ket_thuc",
    "nam_ket_thuc",
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

    public function getDSSVTheoKhoaTreHan(PaginationRequest $request, $khoa_id, int $moc_thoi_gian_id) {

        $nam_to_check = date("Y");

        if (DB::table('moc_thoi_gian_tot_nghiep')->where('id', '=', $moc_thoi_gian_id)->count() > 0) {
            $nam_to_check = DB::table('moc_thoi_gian_tot_nghiep')->where('id', '=', $moc_thoi_gian_id)->get()->first()->nam;
        }

        if ($khoa_id == -1)
            return $this->paginateMultipleTable($request, $this->dssvTable()->where('da_tot_nghiep', '=', 0)->where('nam_ket_thuc', '<', $nam_to_check), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);

        return $this->paginateMultipleTable($request, $this->dssvTable()->where('khoa.id', '=', $khoa_id)->where('da_tot_nghiep', '=', 0)->where('nam_ket_thuc', '<', $nam_to_check), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
    }

    public function getDSSVTheoKhoa(PaginationRequest $request, $khoa_id, $tieu_chi) {

        switch($tieu_chi) {
            case 'non_graduated':
                $tieu_chi = 'non_graduated';
                break;
            case 'graduated':
                $tieu_chi = 'da_tot_nghiep';
                break;
            case 'suspended':
                $tieu_chi = 'buoc_thoi_hoc';
                break;
            default:
                $tieu_chi = '';
                break;
        }

        if ($khoa_id == -1) {
            if ($tieu_chi == 'non_graduated')
                return $this->paginateMultipleTable($request, $this->dssvTable()->where('da_tot_nghiep', '=', 0), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);

            if ($tieu_chi != '') 
                return $this->paginateMultipleTable($request, $this->dssvTable()->where($tieu_chi, '=', 1), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
            
            return $this->paginateMultipleTable($request, $this->dssvTable(), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
        }

        if ($tieu_chi == 'non_graduated')
            return $this->paginateMultipleTable($request, $this->dssvTable()->where('khoa.id', '=', $khoa_id, 'and')->where('da_tot_nghiep', '=', 0), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
        if ($tieu_chi != '') 
            return $this->paginateMultipleTable($request, $this->dssvTable()->where('khoa.id', '=', $khoa_id, 'and')->where($tieu_chi, '=', 1), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
        return $this->paginateMultipleTable($request, $this->dssvTable()->where('khoa.id', '=', $khoa_id), null, ['tinh_trang_sinh_vien.sinh_vien_id'], null, 9);
    }
}