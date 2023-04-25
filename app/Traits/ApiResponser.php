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
    protected function paginate($request, $table, $itemPerPage = 10, $step = 3, $orderColumnDefault = 'id')
    {
        //$request->validate(['sort' => 'in:column1,column2']);
        //if (Schema::hasColumn('users', $request->sort)) {

        $orderColumn = $request->input('order-column');

        if (!($orderColumn && Schema::hasColumn($table, $orderColumn))) {
            $orderColumn = $orderColumnDefault;
        }

        $curPage = $request->input('page');
        if (!is_numeric($curPage)) {
            $curPage = 1;
        }
        $dir = $request->input('dir');
        if (!$dir || !($dir === 'asc' || $dir === 'desc')) {
            $dir = 'asc';
        }
        $total = DB::table($table)->count();
        $data = DB::table($table)
            ->orderBy($orderColumn, $dir)
            ->limit($itemPerPage)
            ->offset(($curPage - 1) * $itemPerPage)
            ->get();
        return $this->success([
            'paginationOption' => [
                'total' => $total,
                'perPage' => $itemPerPage,
                'step' => $step,
            ],
            'dataObject' => $data,
        ]);
        //return   ->paginate($perPage);
    }
    protected function paginateObjectData($request, $objectData, $itemPerPage = 10, $step = 3)
    {
        $finalData = [];
        $curPage = $request->input('page');
        if (!is_numeric($curPage)) {
            $curPage = 1;
        }
        $total = sizeof($objectData);
        for ($i = 0; $i < $itemPerPage; $i++) {
            $indexToGet = ($curPage - 1) * $itemPerPage + $i;
            if ($indexToGet < $total) {
                array_push($finalData, $objectData[$indexToGet]);
            }
        }
        return $this->success([
            'paginationOption' => [
                'total' => $total,
                'perPage' => $itemPerPage,
                'curPage' => $curPage,
                'step' => $step,
            ],
            'dataObject' => $finalData,
        ]);
    }
}