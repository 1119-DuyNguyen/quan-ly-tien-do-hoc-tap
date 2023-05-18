<?php

namespace App\Http\Controllers\Auth;


use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Users\TaiKhoan;
use App\Http\Services\LoginService;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApiController;
use App\Http\Services\PermissionsService;

class UserPermissionsController extends ApiController
{
    private $permissionsService;

    public function __construct(PermissionsService $permissionsService)
    {
        $this->permissionsService = $permissionsService;
    }
    
    public function show($quyen_id) {
        $object = (object) array(
            "tt_quyen" => $this->permissionsService->getQuyen($quyen_id),
            "cn_quyen" => $this->permissionsService->getChucNangThuocQuyen($quyen_id),
            "ds_chuc_nang" => $this->permissionsService->getDanhSachChucNang(),
        );
        return $this->success($object, 200, '');
    }
}
