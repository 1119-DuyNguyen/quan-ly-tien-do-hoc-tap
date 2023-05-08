<?php

namespace App\Http\Controllers\Graduation\Student;


use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Http\Services\SuggestGraduateService;

class SuggestGraduateController extends ApiController
{

    private $suggestGraduateService;

    public function __construct(SuggestGraduateService $suggestGraduateService) {
        $this->suggestGraduateService = $suggestGraduateService;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->suggestGraduateService->main($request);
    }
}
