<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Models\Authorization\TaiKhoan;
use App\Models\SinhVien;
use App\Models\User;
use Illuminate\Http\Request;

class TestApi extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = "test sucess";
        $data = TaiKhoan::where('id', '1=1')->toSql();
        return   $this->success($data, 200);
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
    public function destroy(string $id)
    {
        //
    }
}
