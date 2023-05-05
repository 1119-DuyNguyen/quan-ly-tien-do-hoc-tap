<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\ChildProgramRequest;
use App\Http\Resources\Admin\ChildProgramResource;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;

class ChildProgramController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(ChildProgramRequest $request)
    {
        //
        //
        try {
            //code...
            $loaiKienThuc = DB::table('loai_kien_thuc')->select('id', 'ten')->get();

            $selectDataList = [
                [
                    'loai_kien_thuc_id' => $loaiKienThuc,

                    'text' => 'Chọn loại kiến thức'
                ]
            ];
            $builderTableJoin = DB::table('khoi_kien_thuc')
                ->join(
                    'chuong_trinh_dao_tao',
                    'khoi_kien_thuc.chuong_trinh_dao_tao_id',
                    'chuong_trinh_dao_tao.id'
                )
                ->join('loai_kien_thuc', 'khoi_kien_thuc.loai_kien_thuc_id', 'loai_kien_thuc.id')
                ->selectRaw('khoi_kien_thuc.*,loai_kien_thuc.ten as ten_loai_kien_thuc,chuong_trinh_dao_tao.ten as ten_chuong_trinh_dao_tao');
            $lktInput = $request->input('loai_kien_thuc_id');
            if ($lktInput && $lktInput != '') {
                $builderTableJoin = $builderTableJoin->where('loai_kien_thuc.id', $lktInput);
            }
            return $this->paginateMultipleTable($request, $builderTableJoin, ChildProgramResource::class, ['id', 'ten'], $selectDataList, 5);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, 'Đã xảy ra lỗi khi lấy dữ liệu từ máy chủ ');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ChildProgramRequest $request)
    {
        //
        try {
            KhoiKienThuc::create($request->all());

            return $this->success(null, 200, 'Thêm dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . ' ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $ctdt = KhoiKienThuc::find($id);
        if (is_null($ctdt)) {
            return $this->error(null, 400, 'Không tìm thấy dữ liệu khối kiến thức');
        }
        return $this->success($ctdt, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ChildProgramRequest $request, string $id)
    {
        //
        try {
            $kkt = KhoiKienThuc::findOrFail($id);

            $kkt->fill($request->all())->save();

            return $this->success($kkt, 200, 'Cập nhập dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ cập nhập không thành công' . $e->getMessage());
        }
    }
    public function getSubject()
    {

        try {
            $kkt = KhoiKienThuc::findOrFail($id);

            $kkt->fill($request->all())->save();

            return $this->success($kkt, 200, 'Cập nhập dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ cập nhập không thành công' . $e->getMessage());
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            //code...
            $data = KhoiKienThuc::findOrFail($id);
            $data->delete();
            //

            return $this->success(null, 200, 'Xóa dữ liệu thành công');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, $th->getMessage());
        }
    }
}
