<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Graduation\Student\SemesterController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AdministrativeClassesService;
use App\Http\Services\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AdministrativeClassController extends ApiController
{
    private $administrativeClassesService;

    public function __construct(AdministrativeClassesService $administrativeClassesService)
    {
        $this->administrativeClassesService = $administrativeClassesService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        $ten_lop = "";
        if ($request->class_idn !== null)
            $ten_lop = $request->class_idn;

        return $this->administrativeClassesService->getClassesList($request, $ten_lop);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->administrativeClassesService->addClass($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (intval($id) == 0)
            return $this->error('', 404, 'Không tìm thấy lớp');
        
        return $this->administrativeClassesService->getClass(intval($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (intval($id) == 0)
            return $this->error('', 404, 'Không tìm thấy lớp');

        return $this->administrativeClassesService->updateClass($request, intval($id));
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
