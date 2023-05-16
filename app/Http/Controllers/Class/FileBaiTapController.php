<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use App\Http\Requests\PaginationRequest;
use Illuminate\Support\Facades\Storage;

class FileBaiTapController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function show(Request $request)
    {
        return Storage::download($request->link_file);
    }
}