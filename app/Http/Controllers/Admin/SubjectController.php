<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\SubjectRequest;
use App\Http\Resources\Admin\SubjectResource;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;

class SubjectController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        return $this->paginate($request, 'hoc_phan', SubjectResource::class, ['id', 'ten'], null, 5);
    }
    public function all()
    {
        # code...

        return $this->success(HocPhan::all(), 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $maHP = $request->input('ma_hoc_phan');
            if (HocPhan::where('ma_hoc_phan', $maHP)->exists()) {
                return $this->error(null, 400, 'Đã tồn tại mã học phần');
            } else
                HocPhan::create($request->all());
            return $this->success(null, 200, 'Thêm học phần thành công');
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ thêm không thành công');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        //
        try {
            $hp = HocPhan::findOrFail($id);
            if ($hp)
                return $this->success($hp, 200);
            else {
                return $this->error(null, 400, "Không tìm thấy học phần");
            }
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Yêu cầu tới máy chủ bị lỗi');
        }
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(SubjectRequest $request, string $id)
    {
        //
        //
        try {
            $hp = HocPhan::findOrFail($id);
            $data = $request->all();
            $checkBox = $request->input('co_tinh_tich_luy');
            if (!isset($checkBox)) {
                $data['co_tinh_tich_luy'] = 0;
            }
            $maHP = $request->input('ma_hoc_phan');
            if ($hp->ma_hoc_phan != $maHP && HocPhan::where('ma_hoc_phan', $maHP)->exists()) {
                return $this->error(null, 200, 'Đã tồn tại mã học phần');
            } else {

                $hp->fill($data)->save();
                return $this->success(null, 200, 'Cập nhập học phần thành công');
            }
        } catch (Exception $e) {
            //catch exception
            return $this->error(null, 400, 'Máy chủ cập nhập không thành công');
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
            $data = HocPhan::findOrFail($id);
            $data->delete();
            //

            return $this->success(null, 200, 'Xóa thành công');
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error(null, 400, 'Xóa thất bại ' . $th->getMessage());
        }
    }
}
