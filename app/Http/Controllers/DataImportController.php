<?php

namespace App\Http\Controllers;

use App\Imports\GiangVienImportExcel;
use App\Models\Users\Staffs\GiangVien;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DataImportController extends ApiController
{

    // function __construct(Request $request){
    //     $request->validate([
    //         'files' => 'required',
    //         'files.*' => 'required|mimes:xlx,xlsx,csv'
    //     ]);
    // }

    function import(Request $request){

        $request->validate($this->rules());

        // print_r(Excel::toArray(new GiangVienImportExcel, $request->file('files')));

        print_r( Excel::import(new GiangVienImportExcel, $request->file('files')));

        return $request->file('files')->getClientOriginalName();
    }

    function rules(){
        return [
            'files' => 'required',
            'files.*' => 'required|mimes:xlx,xlsx,csv'
        ];
    }

}
