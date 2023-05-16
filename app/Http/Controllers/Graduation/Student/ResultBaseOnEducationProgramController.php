<?php

namespace App\Http\Controllers\Graduation\Student;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AnalyticsService;

class ResultBaseOnEducationProgramController extends ApiController
{
    private $analyticsService;

    public function __construct(AnalyticsService $analyticsService) {
        $this->analyticsService = $analyticsService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        return $this->analyticsService->tk_sv($request, $request->user()->id);
    }
}
