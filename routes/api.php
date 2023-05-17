<?php

use App\Http\Controllers\Admin\AdministrativeClassController;
use App\Http\Controllers\Admin\AdministrativeClassStudentsController;
use App\Http\Controllers\Admin\AdvisorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Test\TestApi;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\GraduatedController;
use App\Http\Controllers\Admin\LateGraduatedController;
use App\Http\Controllers\Class\ClassroomController;
use App\Http\Controllers\Class\Post\PostController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Class\Post\BaitapController;
use App\Http\Controllers\Class\BaiTapSinhVienController;
use App\Http\Controllers\Admin\ProgramKnowledgeBlockController;
use App\Http\Controllers\Admin\ProgramsListController;
use App\Http\Controllers\Admin\StudentsInClassController;
use App\Http\Controllers\Auth\UserPermissionsController;
use App\Http\Controllers\Graduation\Student\ResultBaseOnEducationProgramController;
use App\Http\Controllers\Graduation\Student\SemesterController;
use App\Http\Controllers\Class\ChamDiemController;
use App\Http\Controllers\DataImportController;
use App\Http\Controllers\Class\Everyone\EveryoneController;
use App\Http\Controllers\Class\FileBaiTapController;
use App\Http\Controllers\Class\ThamGiaController;
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
    Route::apiResource('/file-bai-tap', FileBaiTapController::class);
    Route::apiResource('/tham-gia-nhom-hoc', ThamGiaController::class);
    Route::apiResource('/cham-diem', ChamDiemController::class);
    Route::apiResource('/everyone', EveryoneController::class);
    Route::post('/logout', [UserAuthController::class, 'logout']);
    //   Route::resource('posts', PostController::class);
    Route::apiResource('/test', TestApi::class);

    Route::apiResource('/graduate', GraduateStudentController::class);
    Route::apiResource('/graduate-on-edu-program', ResultBaseOnEducationProgramController::class);
    Route::apiResource('/suggestion', SuggestGraduateController::class);

    Route::apiResource('/semester', SemesterController::class);

    Route::middleware('role:Quản trị viên')
        ->name('admin.')
        ->prefix('/admin')
        ->group(function () {
            Route::apiResource('/analytics', AnalyticsController::class);
            Route::apiResource('/get_students_list.type', GraduatedController::class);
            Route::apiResource('/get_students_list.late', LateGraduatedController::class);
            Route::apiResource('/class.students', StudentsInClassController::class);
            Route::apiResource('/role', RoleController::class);
            Route::apiResource('/user', UserController::class);
            Route::apiResource('/user.role', UserController::class);
            Route::apiResource('/user.faculty', UserController::class);
            Route::apiResource('/user.major', UserController::class);
            Route::apiResource('/user.subject', UserController::class);

            Route::apiResource('/permissions', PermissionController::class);

            Route::apiResource('/user-permissions', UserPermissionsController::class);

            Route::get('/subject/all', [SubjectController::class, 'all']);
            Route::apiResource('/subject', SubjectController::class);

            Route::apiResource('/program', ProgramController::class);
            Route::apiResource('program.knowledge_block', ProgramKnowledgeBlockController::class);

            Route::apiResource('/classes', AdministrativeClassController::class);
            Route::apiResource('/classes.student', AdministrativeClassStudentsController::class);
            Route::apiResource('/classes-program', ProgramsListController::class);
            Route::apiResource('/classes-advisor', AdvisorController::class);

            //      Route::get('/child-program/subject', [KnowledgeBlockController::class, 'getSubject']);
        });
    // Route::apiResource('/period', PeriodController::class);
    // Route::apiResource('/major', MajorController::class);
});
Route::get('/permissions/all', [PermissionController::class, 'all']);

Route::apiResource('/role', RoleController::class);
Route::apiResource('/user', UserController::class);
Route::apiResource('/permissions', PermissionController::class);
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
Route::get('export-data', [DataImportController::class, 'export']);
