<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Graduation\Student\SemesterController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class SuspendedController extends ApiController
{
    private $analyticsService;

    public function __construct(AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request)
    {
        return $this->analyticsService->main($request);
    }
}
