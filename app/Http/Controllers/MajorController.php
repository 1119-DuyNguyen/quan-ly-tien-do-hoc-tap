<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\Models\Nganh;
use Illuminate\Http\Request;

class MajorController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function all()
    {
        return $this->success(Nganh::all(), 200);
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
