<?php

namespace App\Exports;

use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Excel;
use View;

class ExportExcelFromView implements FromView, Responsable, WithHeadings, WithMapping
{

    use Exportable;

    private $model;
    private $header;
    private $mapping;
    private $prepare;

    private $fileName;
    private $writerType = Excel::CSV;

    public function __construct($model, $prepare, $header = [], $mapping = null, $fileName = 'unknow'){
        $this->model = $model;
        if ($header == null)
            // $this->header = Schema::getColumnListing($model::first()->getTable());
            $this->header = array_keys($model::first()->getAttributes());
        else
        $this->header = $header;
        $this->mapping = $mapping;
        $this->fileName = $fileName.'.csv';
        $this->prepare = $prepare;
    }

    public function prepareRows($rows){
        return $rows;
        // return [];
    }

    public function headings(): array
    {
        return $this->header;
    }

    public function map($model):array{
        // dd($model);
        if ($this->mapping == null)
            return array_values($model->getAttributes());
        return $this->mapping;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View {

        $ctdt = "";

        return view('Exports.KhoiKienThuc', [
            'ctdt' => $ctdt
        ]);
    }
}
