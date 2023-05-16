<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class ExportExtelFromCollection implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    private $model;

    public function __construct($model){
        $this->model = $model;
    }

    public function collection()
    {
        return $this->model::all();
    }
}
