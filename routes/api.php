<?php

use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\DataImport\DataImportController;
use App\Http\Controllers\Test\TestApi;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('/register', 'Auth\UserAuthController@register');
// Route::post('/login', 'Auth\UserAuthController@login');
//Route::post('register', [UserAuthController::class, 'register']);

Route::post('login', [UserAuthController::class, 'login']);
Route::post('login/refresh', [UserAuthController::class, 'refresh']);


Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [UserAuthController::class, 'logout']);
    //   Route::resource('posts', PostController::class);
    Route::apiResource('/test', TestApi::class);
});
//oauth
Route::group([
    'as' => 'passport.',
    'prefix' => config('passport.path', 'oauth'),
    'namespace' => '\Laravel\Passport\Http\Controllers',
], function () {
    // Passport routes...
    Route::post('/token', [
        'uses' => 'AccessTokenController@issueToken',
        'as' => 'token',
        'middleware' => 'throttle',
    ]);
    //web
    $guard = config('passport.guard', null);

    Route::middleware(['api', $guard ? 'auth:' . $guard : 'auth'])->group(function () {
        Route::post('/token/refresh', [
            'uses' => 'TransientTokenController@refresh',
            'as' => 'token.refresh',
        ]);
    });
});


//Import data
Route::post('import-data', DataImportController::class);
