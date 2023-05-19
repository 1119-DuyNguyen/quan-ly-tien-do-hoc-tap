<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Authorization\TaiKhoan;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\Admin\UserResource;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {

        try {
            // $builderTableJoin = DB::table('chuong_trinh_dao_tao')
            //     ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', 'nganh.id')
            //     ->join('chu_ky', 'chuong_trinh_dao_tao.chu_ky_id', 'chu_ky.id')
            //     ->selectRaw('chuong_trinh_dao_tao.*,chu_ky.ten as ten_chu_ky,nganh.ten as ten_nganh');
            $builderTableJoin = DB::table('tai_khoan')->join('khoa', 'tai_khoan.khoa_id', 'khoa.id')->join('quyen', 'tai_khoan.quyen_id', 'quyen.id')
                ->selectRaw('tai_khoan.*,khoa.ten as ten_khoa,quyen.ten as ten_quyen');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . ' ' . $e->getMessage());
        }
        return $this->paginateMultipleTable($request, $builderTableJoin, UserResource::class, ['id', 'ten'], '', 5);
        // return $this->paginateMultipleTable($request, $builderTableJoin, null, 10);

        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $trung_ten_dang_nhap = DB::table('tai_khoan')
            ->where('ten_dang_nhap', '=', $request->input('ten_dang_nhap'))->count() > 0;

            if ($trung_ten_dang_nhap)
                return $this->error(null, 409, 'Tên đăng nhập đã tồn tại!');
            $id_tk = DB::table('tai_khoan')->insertGetId(array(
                'ten' => $request->input('ten'),
                'ten_dang_nhap' => $request->input('ten_dang_nhap'),
                'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
                'email' => $request->input('email'),
                'sdt' => $request->input('sdt'),
                'ngay_sinh' => $request->input('ngay_sinh'),
                'khoa_id' => $request->input('khoa_id'),
                'quyen_id' => $request->input('role_id'),
            ));
            if ($request->input('role_id') == 1) {
                DB::table('tinh_trang_sinh_vien')
                ->insert(array(
                    'sinh_vien_id' => $id_tk
                ));
            }

            return $this->success(null, 200, 'Thêm tài khoản thành công!');
        } catch (Exception $e) {
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . ' ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id_tk)
    {
        try {
            if (DB::table('tai_khoan')->where('id', '=', $id_tk)->count() == 0)
                return $this->error(null, 404, 'Không tìm thấy tài khoản!');
            return $this->success(DB::table('tai_khoan')
            ->where('id', '=', $id_tk)
            ->get()->first(), 200, '');
        } catch (Exception $e) {
            return $this->error(null, 400, 'Lỗi máy chủ' . ' ' . $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id_tk)
    {
        try {
            DB::table('tai_khoan')
            ->where('id', '=', $id_tk)
            ->update(array(
                'ten' => $request->input('ten'),
                'email' => $request->input('email'),
                'sdt' => $request->input('sdt'),
                'ngay_sinh' => $request->input('ngay_sinh'),
                'khoa_id' => $request->input('khoa_id'),
                'quyen_id' => $request->input('role_id'),
            ));

            return $this->success(null, 200, 'Sửa tài khoản thành công!');
        } catch (Exception $e) {
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . ' ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id_tk)
    {
        try {
            DB::table('tai_khoan')
            ->where('id', '=', $id_tk)
            ->delete();

            return $this->success(null, 200, 'Xoá tài khoản thành công!');
        } catch (Exception $e) {
            return $this->error(null, 400, 'Máy chủ xoá không thành công' . ' ' . $e->getMessage());
        }
    }
}
