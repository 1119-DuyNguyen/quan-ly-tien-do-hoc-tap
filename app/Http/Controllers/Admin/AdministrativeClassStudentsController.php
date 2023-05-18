<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AdministrativeClassesService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AdministrativeClassStudentsController extends ApiController
{
    private $administrativeClassesService;

    public function __construct(AdministrativeClassesService $administrativeClassesService)
    {
        $this->administrativeClassesService = $administrativeClassesService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $id_lop)
    {
        return $this->administrativeClassesService->getStudentWithClassId($request, $id_lop);
    }

    public function show(Request $request, $id_lop, $sv_idn)
    {
        return $this->administrativeClassesService->getStudent($sv_idn);
    }

    public function store(Request $request, $id_lop)
    {
        return $this->administrativeClassesService->updateStudentsListOfClass($request, $id_lop);
        // return $this->administrativeClassesService->addClass($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_lop, $id_sv)
    {
        // if (intval($id) == 0)
        //     return $this->error('', 404, 'Không tìm thấy lớp');

        // return $this->administrativeClassesService->updateClass($request, intval($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
