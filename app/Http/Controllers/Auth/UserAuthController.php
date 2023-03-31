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

class UserAuthController extends ApiController
{
    private $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }


    public function login(LoginRequest $request)
    {


        return $this->loginService->attemptLogin($request);
    }
    public function refresh(Request $request)
    {
        return $this->loginService->attemptRefresh();
    }


    public function logout()
    {
        return $this->loginService->logout();
    }

    public function username()
    {
        return 'ten_dang_nhap';
    }
}
