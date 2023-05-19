<?php

namespace App\Http\Controllers\Class;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Users\Classes\NhomHoc;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PaginationRequest;
use Illuminate\Support\Facades\Response;

class FileBaiTapController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    public function show(Request $request, string $bai_tap_id)
    {
        if ($request->input('sinh_vien_id') != null) {
            $data = DB::table('bai_tap_sinh_vien')
                ->where('bai_tap_id', '=', $bai_tap_id)
                ->where('sinh_vien_id', '=', $request->sinh_vien_id)
                ->select('link_file as link')
                ->get();
            return Storage::download($data[0]->link, 'baitap.pdf', [
                'Content-Type' => 'application/pdf',
            ]);
        } else {
            $data = DB::table('bai_tap_sinh_vien')
                ->where('bai_tap_id', '=', $bai_tap_id)
                ->where('sinh_vien_id', '=', $request->user()->id)
                ->select('link_file as link')
                ->get();
            return Storage::download($data[0]->link, 'baitap.pdf', [
                'Content-Type' => 'application/pdf',
            ]);
        }
    }
}