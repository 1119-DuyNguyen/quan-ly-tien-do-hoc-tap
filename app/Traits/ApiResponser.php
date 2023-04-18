<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Http\Requests\PaginationRequest;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponser
{
    //Khi tạo controller nhớ extends ApiController để dùng
    //$this->success($data,204,'Xóa Thành công)
    //$this->error($data,403,'Không đủ quyền hạn')
    protected function success($data, int $code = 200, string $message = '')
    {
        return response()->json(
            [
                'status' => 'Request was successful.',
                'data' => $data,
                'message' => $message,
            ],
            $code
        );
    }

    protected function error($data, int $code, $message = '')
    {
        return response()->json(
            [
                'status' => 'An error has occurred...',
                'data' => $data,
                'message' => $message,
            ],
            $code
        );
    }
}