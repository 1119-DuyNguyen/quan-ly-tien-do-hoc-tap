<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ImportExcelToCollection implements ToCollection,SkipsEmptyRows, WithMultipleSheets, SkipsUnknownSheets, WithStartRow, WithValidation, SkipsOnFailure
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    use Importable, SkipsFailures;
    private $header_row = 0;
    private $start_row = 0;
    private $sheetNames;
    private $rules_row = [];
    private $toModel;

    public function __construct( $headerRow, $sheetNames, $rules_row,$toModel){
        $this->header_row = $headerRow;
        // $this->start_row = $startRow;
        $this->rules_row = $rules_row;
        $this->sheetNames = $sheetNames;
        $this->toModel = $toModel;
        // dd($this->toModel);
    }

    public function collection(\Illuminate\Support\Collection $rows){
        dd($rows);
        foreach($rows as $row){
            // dd($row[0]);
            $ndt_pos = strpos($row[0], 'Ngành đào tạo:');
            if ($ndt_pos == 1){
                dd($ndt_pos);
                $nganh_dao_tao = substr($row[0], $ndt_pos, strlen($row[0]) - $ndt_pos);

                dd($nganh_dao_tao);
            }
        }
    }

    function sheets():array {
        $tmp = [];
        foreach($this->sheetNames as $name){
            $tmp[$name] = $this;
        }
        return $tmp;
    }

    function onUnknownSheet($sheetName){
        return info("Sheet {$sheetName} đã bị bỏ qua");
    }

    function startRow():int{
        return $this->start_row;
    }

    public function headingRow(): int
    {
        return $this->header_row;
    }

    function rules(): array{

        return $this->rules_row;
    }


    // function onFailure(Failure ...$failure){
    //     return $failure;
    // }
}
