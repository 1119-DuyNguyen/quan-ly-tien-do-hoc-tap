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
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
use Hamcrest\Type\IsNumeric;

class ProgramKnowledgeBlockController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $mucLucList = [];
        $kktList = DB::table('khoi_kien_thuc')
            ->whereIn('chuong_trinh_dao_tao_id', [$id])
            ->join('muc_luc', 'khoi_kien_thuc.muc_luc_id', 'muc_luc.id')
            ->leftJoin(
                'loai_kien_thuc',
                'khoi_kien_thuc.loai_kien_thuc_id',
                'loai_kien_thuc.id'
            )
            ->orderBy('loai_kien_thuc.id')
            ->get(['khoi_kien_thuc.*', 'loai_kien_thuc.ten as ten_loai_kien_thuc', 'muc_luc.ten as ten_muc_luc']);


        foreach ($kktList as $kkt) {

            $hpBatBuoc = DB::table('hoc_phan_kkt_bat_buoc')
                ->whereIn('khoi_kien_thuc_id', [$kkt->id])
                ->join('hoc_phan', 'hoc_phan_kkt_bat_buoc.hoc_phan_id', 'hoc_phan.id')
                ->orderBy('hoc_phan.ma_hoc_phan')
                ->get(['hoc_phan.*', 'hoc_ky_goi_y']);
            foreach ($hpBatBuoc as $key => $hp) {
                $hp->hoc_ky_goi_y = [$hp->hoc_ky_goi_y];
                if (!isset($curHp)) {
                    $curHp = $hp;
                } else if ($curHp->id == $hp->id) {
                    $curHp->hoc_ky_goi_y = array_merge($curHp->hoc_ky_goi_y, $hp->hoc_ky_goi_y);
                    unset($hpBatBuoc[$key]);
                } else {
                    $curHp = null;
                }
            }
            $kkt->hpBatBuoc = $hpBatBuoc;
            $hpTuChon = DB::table('hoc_phan_kkt_tu_chon')
                ->whereIn('khoi_kien_thuc_id', [$kkt->id])
                ->join('hoc_phan', 'hoc_phan_kkt_tu_chon.hoc_phan_id', 'hoc_phan.id')
                ->orderBy('ma_hoc_phan')
                ->get(['hoc_phan.*', 'hoc_ky_goi_y']);
            foreach ($hpTuChon as $key => $hp) {
                $hp->hoc_ky_goi_y = [$hp->hoc_ky_goi_y];
                if (!isset($curHp)) {
                    $curHp = $hp;
                } else if ($curHp->id == $hp->id) {
                    $curHp->hoc_ky_goi_y = array_merge($curHp->hoc_ky_goi_y, $hp->hoc_ky_goi_y);
                    unset($hpTuChon[$key]);
                } else {
                    $curHp = null;
                }
            }
            $kkt->hpTuChon = $hpTuChon;

            if (isset($mucLucList[$kkt->muc_luc_id])) {

                $mucLucList[$kkt->muc_luc_id] = array_merge($mucLucList[$kkt->muc_luc_id], [$kkt]);
            } else {
                $mucLucList[$kkt->muc_luc_id] =  [$kkt];
            }
        }


        return $this->success($mucLucList, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ChildProgramRequest $request)
    {
        //
        try {
            $data = $request->all();
            KhoiKienThuc::create($data);

            return $this->success(null, 200, 'Thêm dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $ctdtID, string $id)
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
    public function update(ChildProgramRequest $request, string $ctdtID, string $id)
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
    public function destroy(string $ctdt_id, string $id_kkt)
    {
        //
        try {
            //code...
            // db::table('khoi_kien_thuc')
            $data = KhoiKienThuc::findOrFail($id_kkt);
            $data->delete();
            //

            return $this->success(null, 200, 'Xóa dữ liệu thành công');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, $th->getMessage());
        }
    }
}
