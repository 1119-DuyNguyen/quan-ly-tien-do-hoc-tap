<?php

namespace App\Http\Controllers\Graduation\Student;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;


class GraduateStudentController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = DB::table('ket_qua')->where('sinh_vien_id', $request->user()->id)->get();

        $ds_bien_che = DB::table('bien_che')->select('id', 'ten')->get();
        $ds_hoc_phan = DB::table('hoc_phan')->select('id', 'ten', 'so_tin_chi')->get();

        $result = [
            'bien_che' => $ds_bien_che,
            'hoc_phan' => $ds_hoc_phan,
            'ket_qua' => $data
        ];

        return $this->success($result, 200);
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
    public function show(Request $request, string $id)
    {
        $data = DB::table('ket_qua')->where('sinh_vien_id', $request->user()->id)->get();

        $ds_bien_che = DB::table('bien_che')->select('id', 'ten')->where('id', $id)->get();
        $ds_hoc_phan = DB::table('hoc_phan')->select('id', 'ten', 'so_tin_chi')->get();

        $result = [
            'bien_che' => $ds_bien_che,
            'hoc_phan' => $ds_hoc_phan,
            'ket_qua' => $data
        ];

        return $this->success($result, 200);
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
