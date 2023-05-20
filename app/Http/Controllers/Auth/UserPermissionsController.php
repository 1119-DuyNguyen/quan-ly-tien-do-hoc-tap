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
use DB;
use Str;

class UserPermissionsController extends ApiController
{
    private $permissionsService;

    public function __construct(PermissionsService $permissionsService)
    {
        $this->permissionsService = $permissionsService;
    }
    
    public function index() {
        $object = (object) array(
            "ds_chuc_nang" => $this->permissionsService->getDanhSachChucNang(),
        );
        return $this->success($object, 200, '');
    }

    public function show($quyen_id) {
        $object = (object) array(
            "tt_quyen" => $this->permissionsService->getQuyen($quyen_id),
            "cn_quyen" => $this->permissionsService->getChucNangThuocQuyen($quyen_id),
            "ds_chuc_nang" => $this->permissionsService->getDanhSachChucNang(),
        );
        return $this->success($object, 200, '');
    }

    public function update(Request $request, $quyen_id) {
        try {

            $tt_quyen = DB::table('quyen')
            ->where('id', '=', $quyen_id)->get()->first();

            if ($tt_quyen->ten_slug != Str::slug($request->input('ten'))) {
                if (DB::table('quyen')
                ->where('ten_slug','=', Str::slug($request->input('ten')))
                ->exists()) {
                    return $this->error(null, 409, "Tên quyền bị trùng lặp");
                }
            }

            
            DB::table('quyen')
            ->where('id', '=', $quyen_id)
            ->update(array(
                'ten' => $request->input('ten'),
                'ten_slug' => Str::slug($request->input('ten')),
                'ten' => $request->input('ten'),
            ));

            DB::table('chuc_nang_quyen')
            ->where('quyen_id', '=', $quyen_id)
            ->delete();

            $ds_chuc_nang = $request->input('chuc_nang');

            foreach ($ds_chuc_nang as $chuc_nang) {
                DB::table('chuc_nang_quyen')->insert(array(
                    'chuc_nang_id' => $chuc_nang,
                    'quyen_id' => $quyen_id
                ));
            }
        } catch (\Exception $e) {
            return $this->success(null, 500, $e->getMessage());
        }
    }
}
