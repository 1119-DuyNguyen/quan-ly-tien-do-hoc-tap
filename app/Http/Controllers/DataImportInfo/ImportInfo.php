<?php

namespace App\Http\Controllers\DataImportInfo;

use App\Http\Controllers\Controller;
use App\Imports\ImportExcelToCollection;
use App\Imports\ImportExcelToModel;
use Illuminate\Http\Request;

abstract class ImportInfo
{
    abstract public function RowToData();
    abstract public function RowRules();
    public function getImportClass($type){
        switch ($type){
            case 'row':
                return ImportExcelToModel::class;
            case 'all':
                return ImportExcelToCollection::class;
        }
    }

    // public $type = 'row';
    // public $type = 'all';

    // public function RowToData(){
    //     return function ($row){

    //     };
    // }

    // public function RowToData(){
    //     return function ($rows){

    //     };
    // }

    // public function RowRules(){
    //     return [

    //     ];
    // }
}
