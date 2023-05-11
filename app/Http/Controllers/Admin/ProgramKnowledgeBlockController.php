<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\ChildProgramRequest;
use App\Http\Resources\Admin\ChildProgramResource;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;

class ProgramKnowledgeBlockController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $lktList = [];
        $kktList = DB::table('khoi_kien_thuc')
            ->whereIn('chuong_trinh_dao_tao_id', [$id])
            ->join(
                'loai_kien_thuc',
                'khoi_kien_thuc.loai_kien_thuc_id',
                'loai_kien_thuc.id'
            )
            ->get(['khoi_kien_thuc.*', 'loai_kien_thuc.ten as ten_loai_kien_thuc']);


        foreach ($kktList as $kkt) {

            $hpBatBuoc = DB::table('hoc_phan_kkt_bat_buoc')
                ->whereIn('khoi_kien_thuc_id', [$kkt->id])
                ->join('hoc_phan', 'hoc_phan_kkt_bat_buoc.hoc_phan_id', 'hoc_phan.id')->get(['hoc_phan.*', 'hoc_ky_goi_y']);
            $kkt->hpBatBuoc = $hpBatBuoc;
            $hpTuChon = DB::table('hoc_phan_kkt_tu_chon')
                ->whereIn('khoi_kien_thuc_id', [$kkt->id])
                ->join('hoc_phan', 'hoc_phan_kkt_tu_chon.hoc_phan_id', 'hoc_phan.id')->get(['hoc_phan.*', 'hoc_ky_goi_y']);
            $kkt->hpTuChon = $hpTuChon;
            if (!isset($lktList[$kkt->loai_kien_thuc_id])) {
                $lktList[$kkt->loai_kien_thuc_id] = [$kkt];
            } else {
                // tương đương push
                $lktList[$kkt->loai_kien_thuc_id] = [$lktList[$kkt->loai_kien_thuc_id],  [$kkt]];
            }
        }


        return $this->success($lktList, 200);
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
    // public function getSubject()
    // {

    //     try {
    //         $kkt = KhoiKienThuc::findOrFail($id);

    //         $kkt->fill($request->all())->save();

    //         return $this->success($kkt, 200, 'Cập nhập dữ liệu thành công');
    //     } catch (Exception $e) {
    //         //catch exception
    //         return $this->error(null, 400, 'Máy chủ cập nhập không thành công' . $e->getMessage());
    //     }
    // }
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
