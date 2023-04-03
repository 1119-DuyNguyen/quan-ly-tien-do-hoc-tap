<?php

namespace App\Imports;

use Illuminate\Support\Str;
use App\Models\Khoa;
use App\Models\Authorization\TaiKhoan;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class GiangVienImportExcel implements ToModel,WithHeadingRow,SkipsEmptyRows, WithMultipleSheets, SkipsUnknownSheets, WithStartRow, WithValidation, SkipsOnError, SkipsOnFailure
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new TaiKhoan(
            [
                'ten' => $row['tengv'],
                'ten_dang_nhap' => $row['macb'],
                //123456
                'mat_khau' => '$2y$10$WAIS5MeldX9kPDSYSNGdieK9iXl9w9.H4jU8LDoaKerssq1038gmu',
                'remember_token' => Str::random(10),
                'khoa_id' => Khoa::where('ten','Công nghệ thông tin')->first()->id,
                // 'lop_hoc_id' => fake()->randomNumber(),
                'lop_hoc_id' => null,
                'quyen_id' => 2
            ]
        );
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

    public function headingRow(): int
    {
        return 4;
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
