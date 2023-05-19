<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MucLucRequest;

class ProgramMucLuc extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MucLucRequest $request)
    {
        try {
            DB::insert('insert into muc_luc (ten) values (?)', $request->ten);

            return $this->success(null, 200, 'Thêm dữ liệu thành công');
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
