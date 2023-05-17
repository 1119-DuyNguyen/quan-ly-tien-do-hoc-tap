<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AdministrativeClassesService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AdvisorController extends ApiController
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
        return $this->administrativeClassesService->getCvht($request->cvht);
    }
    /**
     * Display a listing of the resource.
     */
    public function show(Request $request, $id)
    {
        return $this->administrativeClassesService->getCvhtWithId($id);
    }
}
