<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\Admin\ProgramResource;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Throwable;

class ProgramController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        //
        $builderTableJoin = DB::table('chuong_trinh_dao_tao')
            ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', 'nganh.id')
            ->join('chu_ky', 'chuong_trinh_dao_tao.chu_ky_id', 'chu_ky.id')
            ->selectRaw('chuong_trinh_dao_tao.*,chu_ky.ten as ten_chu_ky,nganh.ten as ten_nganh');
        return $this->paginateMultipleTable($request, $builderTableJoin, ProgramResource::class, ['id', 'ten'], 5);
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
    public function show(string $id)
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
    public function destroy(Request $request, $id)
    {

        try {
            //code...
            $data = ChuongTrinhDaoTao::findOrFail($id);
            $data->delete();
            //

            return $this->success(null, 200, 'Xóa chương trình đào tạo thành công');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, $th->getMessage());
        }
    }
}
