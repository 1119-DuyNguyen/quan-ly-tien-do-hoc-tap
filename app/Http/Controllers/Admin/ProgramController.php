<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Throwable;
use App\Models\Khoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Requests\Admin\ProgramRequest;
use App\Http\Resources\Admin\ProgramResource;
use App\Models\Users\Students\TrainingProgram\ChuKy;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;

class ProgramController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        //
        try {
            //code...
            $nganh = DB::table('nganh')->select('id', 'ten')->get();
            $chuKy = DB::table('chu_ky')->select('id', 'ten')->get();

            $selectDataList = [
                [
                    'chu_ky_id' => $chuKy,

                    'text' => 'Chọn chu kỳ'
                ],
                [
                    'nganh_id' => $nganh,
                    'text' => 'Chọn ngành'
                ],
            ];
            $builderTableJoin = DB::table('chuong_trinh_dao_tao')
                ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', 'nganh.id')
                ->join('chu_ky', 'chuong_trinh_dao_tao.chu_ky_id', 'chu_ky.id')
                ->selectRaw('chuong_trinh_dao_tao.*,chu_ky.ten as ten_chu_ky,nganh.ten as ten_nganh');
            $ckInput = $request->input('chu_ky_id');
            $nganhInput = $request->input('nganh_id');
            if ($ckInput && $ckInput != '') {
                $builderTableJoin = $builderTableJoin->where('chu_ky.id', $ckInput);
            }
            if ($nganhInput && $nganhInput != '') {
                $builderTableJoin = $builderTableJoin->where('nganh.id', $nganhInput);
            }
            return $this->paginateMultipleTable($request, $builderTableJoin, ProgramResource::class, ['id', 'ten'], $selectDataList, 5);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, 'Đã xảy ra lỗi khi lấy dữ liệu từ máy chủ ');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProgramRequest $request)
    {
        try {
            ChuongTrinhDaoTao::create($request->all());

            return $this->success(null, 200, 'Thêm dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công');
        }
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {


        // if (is_null($ctdt)) {
        //     return $this->error(null, 400, 'Không tìm thấy dữ liệu chương trình đào tạo');
        // }
        return $this->success(
            DB::table('chuong_trinh_dao_tao')
                ->join('nganh', 'chuong_trinh_dao_tao.nganh_id', 'nganh.id')
                ->join('chu_ky', 'chuong_trinh_dao_tao.chu_ky_id', 'chu_ky.id')
                ->join('khoa', 'nganh.khoa_id', 'khoa.id')
                ->selectRaw('chuong_trinh_dao_tao.*,khoa.ten as ten_khoa,nganh.ma_nganh,chu_ky.ten as ten_chu_ky,nganh.ten as ten_nganh')
                ->where('chuong_trinh_dao_tao.id', $id)
                ->first(),
            200
        );

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProgramRequest $request, string $id)
    {
        //
        try {
            $ctdt = ChuongTrinhDaoTao::findOrFail($id);

            $ctdt->fill($request->all())->save();

            return $this->success($ctdt, 200, 'Cập nhập dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(400, 'Máy chủ thêm không thành công');
        }
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
            return $this->success(null, 200, 'Xóa thành công');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, 'Xóa thất bại');
        }
    }
}
