<?php

namespace App\Http\Services;

use App\Http\Requests\PaginationRequest;
use Illuminate\Support\Str;
use App\Traits\ApiResponser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cookie;

class AdministrativeClassesService {
    use ApiResponser;

    public function getCtdtList() {
        $ctdt = DB::table('chuong_trinh_dao_tao')
        ->join('nganh', 'nganh.id', '=', 'chuong_trinh_dao_tao.nganh_id')
        ->join('khoa', 'khoa.id', '=', 'nganh.khoa_id')
        ->join('chu_ky', 'chu_ky.id', '=', 'chuong_trinh_dao_tao.chu_ky_id')
        ->get(array('chuong_trinh_dao_tao.id', 'chuong_trinh_dao_tao.ten as ten', 'nganh.ten as ten_nganh', 'khoa.ten as ten_khoa',
                    'chu_ky.nam_bat_dau', 'chu_ky.nam_ket_thuc'));
        return $this->success($ctdt, 200, '');
    }

    public function getCvht(string $cvht_idn) {
        return $this->success(DB::table('tai_khoan')
        ->where('quyen_id', '=', 3)
        ->where('ten_dang_nhap', '=', $cvht_idn)
        ->get(array('id', 'ten', 'ten_dang_nhap'))->first(),200,'');
    }
    public function getCvhtWithId(int $cvht_id) {
        return $this->success(DB::table('tai_khoan')
        ->where('quyen_id', '=', 3)
        ->where('id', '=', $cvht_id)
        ->get(array('id', 'ten', 'ten_dang_nhap'))->first(),200,'');
    }

    public function getClass(int $lop_hoc_id) {
        if (DB::table('lop_hoc')
        ->where('lop_hoc.id', '=', $lop_hoc_id)->count() == 0)
            return $this->error('', 404, 'Không tìm thấy lớp học!');
        return $this->success(DB::table('lop_hoc')
        ->where('id', '=', $lop_hoc_id)
        ->get()->first(), 200, '');
    }

    public function getClassesList(PaginationRequest $request, string $ma_lop) {
        if (strlen($ma_lop) > 0)
            $ds_lop = DB::table('lop_hoc')->where('ma_lop', 'LIKE', "%$ma_lop%");
        else
            $ds_lop = DB::table('lop_hoc');

        return $this->paginateMultipleTable($request, $ds_lop, null, ['ma_lop'], null, 9);
    }

    public function getStudent(string $student_idn) {
        $sv = DB::table('tinh_trang_sinh_vien')
        ->join('tai_khoan', 'tai_khoan.id', '=', 'tinh_trang_sinh_vien.sinh_vien_id')
        ->where('tai_khoan.ten_dang_nhap', '=', $student_idn)->get(array('tai_khoan.id', 'tai_khoan.ten_dang_nhap', 'tai_khoan.ten'))->first();

        return $this->success($sv, 200, '');
    }

    public function getStudentWithClassId(Request $request, int $class_id) {
        $dssv = DB::table('tinh_trang_sinh_vien')
        ->join('tai_khoan', 'tai_khoan.id', '=', 'tinh_trang_sinh_vien.sinh_vien_id')
        ->where('lop_hoc_id', '=', $class_id)->select(array(
            'tai_khoan.id',
            'ten',
            'ten_dang_nhap'
        ))->get();

        return $this->success($dssv, 200, '');
    }

    public function addClass(Request $request) {
        $ma_lop = $request->input('ma_lop');
        $ten_lop = $request->input('ten_lop');
        $ma_ctdt = $request->input('ma_ctdt');
        $ma_cvht = $request->input('ma_cvht');
        $bat_dau = $request->input('bat_dau');
        $ket_thuc = $request->input('ket_thuc');

        if ($ma_ctdt == -1)
            return $this->error('', 409, 'Chưa chọn chương trình đào tạo!');

        if (DB::table('lop_hoc')
        ->where('ma_lop', '=', $ma_lop)->count() > 0)
            return $this->error('', 409, 'Mã lớp đã tồn tại!');
        if (DB::table('lop_hoc')
        ->where('ten_lop', '=', $ten_lop)->count() > 0)
            return $this->error('', 409, 'Tên lớp đã tồn tại!');
        if (DB::table('chuong_trinh_dao_tao')
        ->where('id', '=', $ma_ctdt)->count() == 0)
            return $this->error('', 404, 'Không tìm thấy chương trình đào tạo!');
        if ($ma_cvht !== null && DB::table('tai_khoan')
        ->where('id', '=', $ma_cvht)->count() == 0)
            return $this->error('', 404, 'Không tìm thấy cố vấn!');
        if ($ma_cvht !== null && DB::table('lop_hoc')
            ->where('co_van_hoc_tap_id', '=', $ma_cvht)->count() > 0)
                return $this->error('', 409, 'Cố vấn đã phụ trách lớp khác!');

        if ($bat_dau === null)
            $bat_dau = now();
        if ($ket_thuc === null)
            $ket_thuc = now();
        
        try {
            $id = DB::table('lop_hoc')->insertGetId(array(
                'ma_lop' => $ma_lop,
                'ten_lop' => $ten_lop,
                'chuong_trinh_dao_tao_id' => $ma_ctdt,
                'co_van_hoc_tap_id' => $ma_cvht,
                'thoi_gian_vao_hoc' => $bat_dau,
                'thoi_gian_ket_thuc' => $ket_thuc
            ));
    
            return $this->success($id, 200, 'Thêm lớp thành công!');
        } catch (Exception $e) {
            return $this->error('', 422, 'Không thể thêm lớp!');
        }
    }

    public function updateClass(Request $request, int $lop_hoc_id) {
        $ma_lop = $request->input('ma_lop');
        $ten_lop = $request->input('ten_lop');
        $ma_ctdt = $request->input('ma_ctdt');
        $ma_cvht = $request->input('ma_cvht');
        $bat_dau = $request->input('bat_dau');
        $ket_thuc = $request->input('ket_thuc');

        if ($ma_ctdt == -1)
            return $this->error('', 409, 'Chưa chọn chương trình đào tạo!');

        if (DB::table('lop_hoc')
        ->where('id', '=', $lop_hoc_id)->count() > 0) {
            $lop_hoc_hien_tai = DB::table('lop_hoc')->where('id', '=', $lop_hoc_id)->get()->first();

            if ($lop_hoc_hien_tai->ma_lop != $ma_lop) {
                if (DB::table('lop_hoc')->where('ma_lop', '=', $ma_lop)->count() > 0)
                    return $this->error('', 409, 'Mã lớp đã tồn tại!');
            }

            if ($lop_hoc_hien_tai->ten_lop != $ten_lop) {
                if (DB::table('lop_hoc')->where('ten_lop', '=', $ten_lop)->count() > 0)
                    return $this->error('', 409, 'Tên lớp đã tồn tại!');
            }

            if ($lop_hoc_hien_tai->co_van_hoc_tap_id != $ma_cvht) {
                if (DB::table('lop_hoc')->where('co_van_hoc_tap_id', '=', $ma_cvht)->count() > 0)
                    return $this->error('', 409, 'Cố vấn học tập đã phụ trách lớp khác!');
            }

            if (DB::table('chuong_trinh_dao_tao')->where('id', '=', $ma_ctdt)->count() == 0)
                return $this->error('', 404, 'Không tìm thấy chương trình đào tạo!');
            
            if ($ma_cvht !== null && DB::table('tai_khoan')
                ->where('id', '=', $ma_cvht)->count() == 0)
                    return $this->error('', 404, 'Không tìm thấy cố vấn!');

            if ($bat_dau === null)
                $bat_dau = now();
            if ($ket_thuc === null)
                $ket_thuc = now();

            try {
                $id = DB::table('lop_hoc')
                ->where('id', '=', $lop_hoc_id)
                ->update(array(
                    'ma_lop' => $ma_lop,
                    'ten_lop' => $ten_lop,
                    'chuong_trinh_dao_tao_id' => $ma_ctdt,
                    'co_van_hoc_tap_id' => $ma_cvht,
                    'thoi_gian_vao_hoc' => $bat_dau,
                    'thoi_gian_ket_thuc' => $ket_thuc
                ));
        
                return $this->success($id, 200, 'Cập nhật lớp thành công!');
            } catch (Exception $e) {
                return $this->error('', 422, 'Không thể thêm lớp!');
            }
        }
        return $this->error('', 404, 'Không tìm thấy lớp!');
    }

    public function removeClass(int $lop_hoc_id) {
        DB::table('tinh_trang_sinh_vien')
        ->where('lop_hoc_id', '=', $lop_hoc_id)
        ->update(array(
            "lop_hoc_id" => null
        ));

        DB::table('lop_hoc')
        ->where('id', '=', $lop_hoc_id)
        ->delete();

        return $this->success('', 200, 'Xoá lớp thành công'); 
    }

    public function updateStudentsListOfClass(Request $request, int $lop_hoc_id) {

        if ($request->input('dssv') === null)
            return $this->error('dssv bị null', 500, 'Lỗi xảy ra phía máy chủ');

        DB::table('tinh_trang_sinh_vien')
        ->whereNotIn('sinh_vien_id', $request->input('dssv'))
        ->where('lop_hoc_id', '=', $lop_hoc_id)
        ->update(array(
            "lop_hoc_id" => null
        ));
        
        foreach($request->input('dssv') as $sv) {
            DB::table('tinh_trang_sinh_vien')
            ->where('sinh_vien_id', '=', $sv)
            ->update(array(
                "lop_hoc_id" => $lop_hoc_id
            ));
        }

        return $this->success('', 200, 'Cập nhật danh sách sinh viên thành công'); 
    }
}