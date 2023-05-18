<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Graduation\Student\SemesterController;
use App\Http\Requests\PaginationRequest;
use App\Http\Services\AnalyticsService;
use App\Http\Services\GetListStudentsService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LateGraduatedController extends ApiController
{
    private $getListStudentsService;

    public function __construct(GetListStudentsService $getListStudentsService)
    {
        $this->getListStudentsService = $getListStudentsService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PaginationRequest $request, int $khoa_id)
    {
        return $this->getListStudentsService->getDSSVTheoKhoaTreHan($request, $khoa_id, -1);
    }
    public function show(PaginationRequest $request, int $khoa_id, int $moc_thoi_gian_id)
    {
        return $this->getListStudentsService->getDSSVTheoKhoaTreHan($request, $khoa_id, $moc_thoi_gian_id);
    }
}
