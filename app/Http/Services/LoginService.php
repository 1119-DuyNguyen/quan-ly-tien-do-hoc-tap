<?php

namespace App\Http\Services;

use Illuminate\Support\Str;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cookie;


// use Infrastructure\Auth\Exceptions\InvalidCredentialsException;
// use Api\Users\Repositories\UserRepository;

class LoginService
{
    const REFRESH_TOKEN = 'refresh_token';
    const ACCESS_TOKEN = 'access_token';

    use ApiResponser;


    public function attemptLogin($request)
    {
        // password vì thằng Auth nó fix cứng cmnr và sẽ dùng bên user thể kiểm tra :)))

        $data = [
            'ten_dang_nhap' => $request->input('tk'),
            'password' =>  $request->input('mk'),
        ];

        // Dò data trong table users

        if (auth()->attempt($data)) {
            // vì passport cần username :)))

            $data['username'] = $data['ten_dang_nhap'];
            return $this->proxy('password', $data, 'Đăng nhập thành công', '*');
        } else {
            return $this->error(null, 400, 'Tài khoản hoặc mật khẩu không đúng. Hãy thử lại ');
        }
    }

    /**
     *  refresh the access token saved in a cookie
     */
    public function attemptRefresh()
    {

        $refreshToken = Cookie::get(self::REFRESH_TOKEN);

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken,
            'scope' => ''
        ], '');
    }

    /**
     * Proxy a request to the OAuth server. (limit scope)
     *
     * @param string $grantType  type of grant type should be proxied
     * @param array $data  data send to the server
     */
    private function proxy($grantType, array $data = [], $message = '', $scope = '')
    {


        $data = array_merge($data, [
            'client_id'     => env('PASSWORD_CLIENT_ID', '2'),
            'client_secret' => env('PASSWORD_CLIENT_SECRET', 'U8JUFnmp4fy0P0Sy8lZlHALDdb2V5xKcYR1z7wbT'),
            'grant_type'    => $grantType,
        ]);
        if ($scope) {
            $data['scope'] = $scope;
        } else {
            $data['scope'] = '';
        }

        /*
            internal API request.
        */
        $internalRequest = Request::create('/api/oauth/token', 'POST', $data);
        $response = app()->handle($internalRequest);
        if (!$response->isSuccessful()) {
            // dd($response);
            $cookieRefresh = Cookie::forget(Self::REFRESH_TOKEN);
            return $this->error('', 407, "Máy chủ xác thực thất bại.")->withCookie($cookieRefresh);
        }

        $data = json_decode($response->getContent(), true);
        // Create a refresh token cookie
        //10 ngày
        // $cookieAcessToken = $this->getDetailCookies(self::ACCESS_TOKEN, $data['access_token'], $data['expires_in']);

        switch ($grantType) {
            case 'password':
                $cookieRefreshToken = $this->getDetailCookies(self::REFRESH_TOKEN, $data['refresh_token'], strtotime(now()->addDay(10)->toDateString()));
                $user = request()->user();
                return $this->success([
                    'user' => $user['ten'],
                    'role' => $user->quyen->ten,
                    'accessToken' => $data['access_token'],
                    'expireToken' => $data['expires_in'],
                    'roleSlug' => Str::slug($user->quyen->ten)
                    // 'roles' => $user->quyens
                ], 200, $message)->withCookie($cookieRefreshToken);
                break;
            case 'refresh_token':
                $cookieRefreshToken = $this->getDetailCookies(self::REFRESH_TOKEN, $data['refresh_token'], strtotime(now()->addDay(10)->toDateString()));

                return $this->success([
                    'accessToken' => $data['access_token'],
                    'expireToken' => $data['expires_in'],
                    // 'roles' => $user->quyens
                ], 200, $message)->withCookie($cookieRefreshToken);
                break;
            default:
                return $this->error(['error' => "Máy chủ xác thực thất bại. Hãy thử lại sau ít phút"], 407);
                # code...
                break;
        }

        // return $this->success([
        //     'user' => $user,
        //     'roles' => $user->quyens
        // ], 200)->withCookie(
        //     $cookie['name'],
        //     $cookie['value'],
        //     $cookie['minutes'],
        //     $cookie['path'],
        //     $cookie['domain'],
        //     $cookie['secure'],
        //     $cookie['httponly'],
        //     $cookie['samesite']
        // );
    }
    private function getDetailCookies($name, $token, $time)
    {
        return cookie(
            $name,
            $token,
            $time,
            null,
            null,
            //  true, // for production
            null, // for localhost
            true,
            false,
            'strict',
        );
        // return [
        //     'name' => $name,
        //     'value' => $refreshToken_token,
        //     'minutes' => $time,
        //     'path' => null,
        //     'domain' => null,
        //     // 'secure' => true, // for production
        //     'secure' => null, // for localhost
        //     'httponly' => true,
        //        'raw'=>false
        //     'samesite' => 'lax',
        // ];
    }

    public function logout()
    {
        $cookieRefresh = Cookie::forget(Self::REFRESH_TOKEN);
        // $cookieAccess = Cookie::forget(Self::REFRESH_TOKEN);
        /** @var \App\Models\Authorization\TaiKhoan $user **/
        $user = auth()->user();

        $accessToken = $user->token();
        //log out all devices
        $refreshToken = DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
        //  dd(Cookie::get(self::REFRESH_TOKEN));

        return $this->success('', 200, 'Đăng xuất thành công')->withCookie(
            $cookieRefresh,
            // $cookieAccess
        );
    }
    public function username()
    {
        return 'ten_dang_nhap';
    }
}
