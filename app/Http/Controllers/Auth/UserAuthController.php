<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ApiController;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class UserAuthController extends ApiController
{
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
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'Đăng nhập thất bại '], 401);
        }
    }
}
