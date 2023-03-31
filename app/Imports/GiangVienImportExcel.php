<?php

namespace App\Imports;

use App\Models\GiangVien;
use Maatwebsite\Excel\Concerns\ToModel;

class GiangVienImportExcel implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new GiangVien([
            //
        ]);
    }
}
