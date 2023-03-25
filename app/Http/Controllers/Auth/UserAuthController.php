<?php

namespace App\Http\Controllers\Auth;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

class UserAuthController extends ApiController
{
    // private $loginProxy;

    // public function __construct(LoginProxy $loginProxy)
    // {
    //     $this->loginProxy = $loginProxy;
    // }
    //
    // public function register(Request $request)
    // {
    //     $data = $request->validate([
    //         'name' => 'required|max:255',
    //         'mssv' => 'required|email|unique:users',
    //         'password' => 'required|confirmed',
    //     ]);

    //     $data['password'] = bcrypt($request->password);

    //     $user = User::create($data);

    //     $token = $user->createToken('API Token')->accessToken;

    //     return response(['user' => $user, 'token' => $token]);
    // }

    public function login(LoginRequest $request)
    {
        $data = [
            'email' => $request->input('email'),
            'password' =>  $request->input('password'),
        ];

        //        Dò data trong table users
        // Auth
        //
        if (auth()->attempt($data)) {
            /** @var \App\Models\User $user **/
            $user = auth()->user();
            $token = $user->createToken('LaravelAuthApp')->accessToken;
            return $this->success(['access_token' => $token, 'user' => auth()->user()], 200);
        } else {
            return $this->error(['error' => 'Đăng nhập thất bại '], 401);
        }
    }
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'Đăng xuất thành công'];
        return $this->success($response, 200);
    }
}
