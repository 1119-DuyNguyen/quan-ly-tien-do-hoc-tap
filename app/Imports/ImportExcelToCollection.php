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

    private $BatBuoc = [];
    private $TuChon = [];
    private $CTDT;
    private $KKT;

    public function __construct( $headerRow, $sheetNames, $rules_row,$toModel){
        $this->header_row = $headerRow;
        // $this->start_row = $startRow;
        $this->rules_row = $rules_row;
        $this->sheetNames = $sheetNames;
        $this->toModel = $toModel;
        // dd($this->toModel);
    }


    public function getValueFromKeyStr($str, $key){
        $key_pos = strpos($str, $key);
        if ($key_pos === 0){
            $value = substr($str, strlen($key), strlen($str) - strlen($key));
            // dd($value);
            return $value;
        }

    }

    public function getFloatFromStr($str){
        return (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }

    public function checkTrueAndSet($values, &$set){
        // return $values;
        foreach ($values as $index=>$value){
            // dd($index, $value);
            if ($value === false || !isset($value))
                $rs[$index] = $value;
        }
        if (isset($rs)) return false;
        $set = $values;
        return true;
        // return true;
    }

    public function setIfNotSet($value, &$set){
        if (!isset($set) && isset($value)){
            $set = $value;
            return true;
        }
        return isset($set);
        // return false;
    }

    public function checkValue(&$value, $str, $key){
        if (
            !$this->setIfNotSet(
                $this->getValueFromKeyStr(
                    $str,
                    $key
                ),
                $value
            )
        ) return false;
        return true;
    }

    public function collection(\Illuminate\Support\Collection $rows){
        // dd($rows);
        $isCTDT = false;
        $isKhoiKienThuc = false;
        $isBatBuoc = false;
        foreach($rows as $row){

            if ($isCTDT === false){
                $this->setIfNotSet(
                    $this->getValueFromKeyStr($row[0], 'Ngành đào tạo: '),
                    $ndt
                );

                $this->setIfNotSet(
                    $this->getValueFromKeyStr($row[0], 'Mã ngành: '),
                    $id_dt
                );

                $this->setIfNotSet(
                    $this->getValueFromKeyStr($row[0], 'Trình độ đào tạo: '),
                    $tddt
                );

                if ($this->getValueFromKeyStr($row[0], 'Thời gian đào tạo: ') !== 0.0)
                    $this->setIfNotSet(
                        $this->getValueFromKeyStr($row[0], 'Thời gian đào tạo: '),
                        $time_dt
                    );

                $isCTDT = $this->checkTrueAndSet([$ndt, $id_dt, $tddt, $time_dt], $this->CTDT);
                continue;
            }

            // dd($this->CTDT);

            if ($isKhoiKienThuc === false){

                if (!$this->checkValue(
                    $ten_ktt,
                    $row[0],
                    '#'
                )) continue;


                if (!$this->checkValue(
                    $ten_loaiKKT,
                    $row[0],
                    '*'
                )) continue;

                // dd($ten_loaiKKT);

                if ($row[0][0] == '*')
                    $isBatBuoc = true;

                if ($isBatBuoc){
                    array_push($this->TuChon, $this->getHP($row));
                }else{
                    array_push($this->BatBuoc, $this->getHP($row));
                }



            }


        }
    }

    function getHP($row){
        if (HocPhan::where('id', $row[1])->first() != null){
            new HocPhan([
                'id' => $row[1],
                'ten' => $row[2],
                ''
            ]);
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
