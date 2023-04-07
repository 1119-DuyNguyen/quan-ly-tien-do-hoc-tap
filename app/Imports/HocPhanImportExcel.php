<?php

namespace App\Imports;

use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class HocPhanImportExcel implements ToModel,WithHeadingRow,SkipsEmptyRows, WithMultipleSheets, SkipsUnknownSheets, WithStartRow, WithValidation, SkipsOnFailure
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    private $heading_row = 0;
    public function model(array $row)
    {
        return new HocPhan([

        ]);
    }

    function sheets():array {
        return [
            'HP-GV' => $this
        ];
    }

    function onUnknownSheet($sheetName){
        return info("Sheet {$sheetName} đã bị bỏ qua");
    }

    function startRow():int{
        return 0;
    }

    public function headingRow($row): int
    {
        // return $this->$heading_row;
        // if (HocPhan::where('ma_hoc_phan', $row['mahp'])->first());
        return new HocPhan([
            'ma_hoc_phan' => $row['mahp'],
            'ten' => $row['tenhp'],
            'so_tin_chi' => $row['so_tin_chi'],
            'phan_tram_giua_ki' => $row[''],
            'phan_tram_cuoi_ki' => $row['']
        ]);
    }

    function rules(): array{
        return [
            'tengv' => 'required',
            'macb' => 'required|int'
        ];
    }

    function ruleRequired($attribute, $value, $onFailure){

    }

    function onFailure(\Maatwebsite\Excel\Validators\Failure ... $failure){

    }

    function onError(\Throwable $throwable){

    }
}
