<?php

namespace App\Http\Controllers\DataImport;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class ImportInfo
{
    abstract public function RowToModel();

    abstract public function RowRules();

    // abstract public function RowToCollection();
}
