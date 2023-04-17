<?php

namespace App\Http\Controllers\DataImport;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class ImportInfo
{
    // protected $heading_row = 0;
    // protected $start_row = 0;
    // protected $sheetNames;
    // protected $rules = [];

    // function __construct($header_row, $startRow, $sheetNames, $rules){
    //     $this->heading_row = $header_row;
    //     $this->start_row = $startRow;
    //     $this->sheetNames = $sheetNames;
    //     // $this->rules = $rules;
    // }

    abstract public function RowToModel();

    abstract public function RowRules();

    // public function setSheetNames($sheetNames){
    //     $this->sheetNames = $sheetNames;
    // }

}
