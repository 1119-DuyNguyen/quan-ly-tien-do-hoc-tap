<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\ProgramKnowledgeBlockSubjectRequest;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;

class ProgramKnowledgeBlockSubject extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index($idCTDT, $idKKT)
    {

        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProgramKnowledgeBlockSubjectRequest $request, $idCTDT, $idKKT)
    {
        //
        try {

            $data = $request->all();
            return $this->success($data, 200, 'Thêm dữ liệu thành công');
            $type = $request->input('loai_hoc_phan', 0);
            if ($type == 0) {
                foreach ($request->hoc_ky_goi_y as $hk) {
                    DB::table('hoc_phan_kkt_tu_chon')
                        ->updateOrInsert([
                            'hoc_phan_id', $request->hoc_phan_id,
                            'khoi_kien_thuc_id' => $idKKT, 'hoc_ky_goi_y' => $hk
                        ]);
                    # code...
                }
                DB::table('hoc_phan_kkt_tu_chon')
                    ->where('hoc_phan_id', '=', $request->hoc_phan_id)
                    ->where('khoi_kien_thuc_id', '=', $idKKT)
                    ->whereNotIn('hoc_ky_goi_y', $request->hoc_ky_goi_y)
                    ->delete();
            } else if ($type == 1) {
                foreach ($request->hoc_ky_goi_y as $hk) {
                    DB::table('hoc_phan_kkt_bat_buoc')
                        ->updateOrInsert([
                            'hoc_phan_id', $request->hoc_phan_id,
                            'khoi_kien_thuc_id' => $idKKT, 'hoc_ky_goi_y' => $hk
                        ]);

                    # code...
                }
                DB::table('hoc_phan_kkt_bat_buoc')
                    ->where('hoc_phan_id', '=', $request->hoc_phan_id)
                    ->where('khoi_kien_thuc_id', '=', $idKKT)
                    ->whereNotIn('hoc_ky_goi_y', $request->hoc_ky_goi_y)
                    ->delete();
            }
            // KhoiKienThuc::create($data);
            return $this->success(null, 200, 'Thêm dữ liệu thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công' . $e->getMessage());
        }
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
    public function destroy(string $id)
    {
        //
    }
}
