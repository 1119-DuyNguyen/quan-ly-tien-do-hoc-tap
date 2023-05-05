<?php

namespace App\Traits;

use ReflectionClass;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Concerns\ToArray;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\Admin\RoleResource;
use App\Http\Resources\Admin\RoleCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Resources\Json\JsonResource;

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
    protected function paginate($request, $table, $jsonResource, $orderColumnValid = ['id'], $selectDataList = [],  $itemPerPage = 10, $step = 3)
    {
        //$request->validate(['sort' => 'in:column1,column2']);
        //if (Schema::hasColumn('users', $request->sort)) {

        $orderColumn = $request->input('order-column');

        if (isset($orderColumn)) {
            $isAcceptValue = false;
            foreach ($orderColumnValid as $value) {
                if ($orderColumn == $value) {
                    $isAcceptValue = true;
                    break;
                }
            }

            if (!$isAcceptValue) {
                $orderColumn = $orderColumnValid[0] ?? 'id';
            }
        } else {
            $orderColumn = $orderColumnValid[0] ?? 'id';
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
        //dd($jsonResource . "::collection");
        if (isset($jsonResource)) {
            $r = new ReflectionClass($jsonResource);

            $data = $data->map(function ($item) use ($r) {
                return  $r->newInstanceArgs([$item]);
            });
        }
        if ($total <= $itemPerPage) {
            return $this->success([

                'dataObject' => $data,
                'selectDataList' => $selectDataList

                //call_user_func($jsonResource . "::collection", $data),
            ]);
        }
        return $this->success([
            'paginationOption' => [
                'total' => $total,
                'perPage' => $itemPerPage,
                'step' => $step,

            ],
            'dataObject' => $data,
            'selectDataList' => $selectDataList
            //call_user_func($jsonResource . "::collection", $data),
        ]);
        //return   ->paginate($perPage);
    }
    protected function getAll()
    {
    }
    /**
     * @param mixed $request
     * @param mixed $builderTableJoin DB::table('abc')->join(...)
     * @param mixed $jsonResource
     * @param int $itemPerPage
     * @param int $step
     * 
     * @return [type]
     */
    protected function paginateMultipleTable($request, $builderTableJoin,   $jsonResource,  $orderColumnValid = ['id'], $selectDataList = [], $itemPerPage, $step = 3)
    {
        //$request->validate(['sort' => 'in:column1,column2']);
        //if (Schema::hasColumn('users', $request->sort)) {
        $curPage = $request->input('page');
        if (!is_numeric($curPage)) {
            $curPage = 1;
        }
        $dir = $request->input('dir');
        if (!$dir || !($dir === 'asc' || $dir === 'desc')) {
            $dir = 'asc';
        }
        $orderColumn = $request->input('order-column');

        if (isset($orderColumn)) {
            $isAcceptValue = false;
            foreach ($orderColumnValid as $value) {
                if ($orderColumn == $value) {
                    $isAcceptValue = true;
                    break;
                }
            }

            if (!$isAcceptValue) {
                $orderColumn = $orderColumnValid[0] ?? 'id';
            }
        } else {
            $orderColumn = $orderColumnValid[0] ?? 'id';
        }
        if (!isset($itemPerPage)) {
            $itemPerPage = 10;
        }
        $total = $builderTableJoin->count();
        $data = $builderTableJoin
            ->orderBy($orderColumn, $dir)
            ->limit($itemPerPage)
            ->offset(($curPage - 1) * $itemPerPage)
            ->get();

        //dd($jsonResource . "::collection");
        if (isset($jsonResource)) {
            $r = new ReflectionClass($jsonResource);

            $data = $data->map(function ($item) use ($r) {
                return  $r->newInstanceArgs([$item]);
            });
        }
        if ($total <= $itemPerPage) {
            return $this->success([

                'dataObject' => $data,
                'selectDataList' => $selectDataList

                //call_user_func($jsonResource . "::collection", $data),
            ]);
        }
        return $this->success([
            'paginationOption' => [
                'total' => $total,
                'perPage' => $itemPerPage,
                'step' => $step,
            ],
            'dataObject' => $data,
            'selectDataList' => $selectDataList

            //call_user_func($jsonResource . "::collection", $data),
        ]);
        //return   ->paginate($perPage);
    }
}
