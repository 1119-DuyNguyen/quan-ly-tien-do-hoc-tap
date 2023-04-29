<?php

use App\Http\Controllers\Admin\AnalyticsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Test\TestApi;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Class\ClassroomController;
use App\Http\Controllers\Class\Post\PostController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Class\Post\BaitapController;
use App\Http\Controllers\Class\BaiTapSinhVienController;
use App\Http\Controllers\DataImport\DataImportController;
use App\Http\Controllers\Class\Everyone\EveryoneController;
use App\Http\Controllers\Graduation\Student\GraduateStudentController;
use App\Http\Controllers\Graduation\Student\SuggestGraduateController;

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
    Route::apiResource('/classes', ClassroomController::class);
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/exercises', BaitapController::class);
    Route::apiResource('/bai-tap-sinh-vien', BaiTapSinhVienController::class);
    Route::apiResource('/everyone', EveryoneController::class);
    Route::post('/logout', [UserAuthController::class, 'logout']);
    //   Route::resource('posts', PostController::class);
    Route::apiResource('/test', TestApi::class);

    Route::apiResource('/graduate', GraduateStudentController::class);
    Route::apiResource('/suggestion', SuggestGraduateController::class);

    Route::middleware('role:Quản trị viên')
        ->name('admin.')
        ->prefix('/admin')
        ->group(function () {

            Route::apiResource('/analytics', AnalyticsController::class);
            Route::apiResource('/role', RoleController::class);
            Route::apiResource('/permissions', PermissionController::class);
        });
});
//oauth
Route::group(
    [
        'as' => 'passport.',
        'prefix' => config('passport.path', 'oauth'),
        'namespace' => '\Laravel\Passport\Http\Controllers',
    ],
    function () {
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
    }
);

//Import data
Route::post('import-data', DataImportController::class);
