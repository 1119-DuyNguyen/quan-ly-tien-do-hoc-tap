<?php

namespace App\Http\Controllers\Admin;

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
        $builderTableJoin = DB::table('tai_khoan')->join('khoa', 'tai_khoan.khoa_id', 'khoa.id')->join('quyen', 'tai_khoan.quyen_id', 'quyen.id')
            ->selectRaw('tai_khoan.*,khoa.ten as ten_khoa,quyen.ten as ten_quyen');
        return $this->paginateMultipleTable($request, $builderTableJoin, UserResource::class, 10);
        // return $this->paginateMultipleTable($request, $builderTableJoin, null, 10);

        //
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
    public function show(TaiKhoan $taiKhoan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaiKhoan $taiKhoan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaiKhoan $taiKhoan)
    {
        //
    }
}
