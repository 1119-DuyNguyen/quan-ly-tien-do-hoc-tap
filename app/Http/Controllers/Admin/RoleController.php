<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use App\Models\Authorization\Quyen;
use Illuminate\Http\Request;

class RoleController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        //
        //$roles =  Quyen::WhereNotIn('ten', 'Quản trị viên')->get();
        // $roles =  Quyen::all();
        // try {
        //     $builderTableJoin = DB::table('chuong_trinh_dao_tao')
        //         ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', 'nganh.id')
        //         ->join('chu_ky', 'chuong_trinh_dao_tao.chu_ky_id', 'chu_ky.id')
        //         ->selectRaw('chuong_trinh_dao_tao.*,chu_ky.ten as ten_chu_ky,nganh.ten as ten_nganh');
        //     $builderTableJoin = DB::table('tai_khoan')->join('khoa', 'tai_khoan.khoa_id', 'khoa.id')->join('quyen', 'tai_khoan.quyen_id', 'quyen.id')
        //         ->selectRaw('tai_khoan.*,khoa.ten as ten_khoa,quyen.ten as ten_quyen');
        // } catch (Exception $e) {
        //     //catch exception
        //     return $this->error(null, 400, 'Máy chủ thêm không thành công' . ' ' . $e->getMessage());
        // }
        // return $this->paginateMultipleTable($request, $builderTableJoin, UserResource::class, ['id', 'ten'], '', 5);
        // // return $this->paginateMultipleTable($request, $builderTableJoin, null, 10);

        return $this->paginate($request, 'quyen', RoleResource::class, ['id', 'ten'], null, 5);
        // return  $this->success($roles, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quyen $quyen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quyen $quyen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quyen $quyen)
    {
        //
    }
}
