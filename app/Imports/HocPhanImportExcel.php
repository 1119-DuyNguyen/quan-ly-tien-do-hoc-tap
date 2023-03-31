<?php

namespace App\Imports;

use App\Models\HocPhan;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class HocPhanImportExcel implements ToModel, WithHeadingRow, WithStartRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new HocPhan([

        ]);
    }

    public function startRow(): int
    {
        return 2;
    }

}
