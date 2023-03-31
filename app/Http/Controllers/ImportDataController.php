<?php

namespace App\Http\Controllers;

use App\Imports\ImportKhoaExcel;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportDataController extends ApiController
{
    public function import(Request $request){


        // Excel::import(new ImportKhoaExcel, $request->file);
        // return $this->success("Thêm data thành công");

        $array = Excel::toArray('', $request->file);
        return [
            $array[0][3][0],
            $array[1][3][0],
            $array[2][3][0],
        ];

    }
}
