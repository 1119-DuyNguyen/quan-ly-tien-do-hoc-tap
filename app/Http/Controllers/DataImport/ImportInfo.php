<?php

namespace App\Http\Controllers\DataImport;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class ImportInfo
{
    abstract public function ImportType():int;
    abstract public function RowToData();

    abstract public function RowRules();

    // abstract public function RowToCollection();
}
