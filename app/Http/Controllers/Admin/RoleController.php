<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Requests\RoleRequest;
use App\Models\Authorization\Quyen;
use Illuminate\Http\Request;

class RoleController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        //
        //$roles =  Quyen::WhereNotIn('ten', 'Quản trị viên')->get();
        // $roles =  Quyen::all();

        return $this->paginate($request, 'quyen', 1);
        // return  $this->success($roles, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quyen $quyen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quyen $quyen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quyen $quyen)
    {
        //
    }
}