<?php

namespace App\Imports;

use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhan;

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

    private $CTDT;
    // private $Loai_KKTS = [];
    private $stage = 0;

    private $ten_KKT;
    private $KKT_count = -1;
    private $KKTList= [];
    private $ten_loai;
    private $loai_count = -1;
    private $loaiList = [];

    private $BatBuoc = [];
    private $TuChon = [];
    private $isTuChon = false;


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

    public function stageNext($stage = null){
        if ($stage == null)
            $stage = $this->stage;
        switch ($stage){
            case 0:
                break;
            case 1:
                $dai_cuong = 0;
                if ($this->loai_count == -1)
                    $dai_cuong = 1;
                array_push($this->loaiList,[
                    'ten' => $this->ten_loai,
                    'dai_cuong' => $dai_cuong
                ]);
                $this->loai_count++;
                break;
            case 2:
                array_push($this->KKTList, [
                    'ten' => $this->ten_KKT,
                    'loai_kien_thuc_id' => $this->loai_count
                ]);
                $this->KKT_count++;
                $this->isTuChon = false;
                break;
            case 3:
                $this->KKTList[$this->KKT_count]['tu_chon'] = $this->TuChon;
                $this->KKTList[$this->KKT_count]['bat_buoc'] = $this->BatBuoc;
                $this->stage--;
                break;
        }
        $this->stage++;
    }

    public function collection(\Illuminate\Support\Collection $rows){
        // dd($rows);
        // $isCTDT = false;
        // $isKhoiKienThuc = false;
        // $isBatBuoc = false;
        foreach($rows as $row){

            // if ($this->stage == 3){
            //     if ($row[0][0] == '*')
            //     $isBatBuoc = true;

            //     if ($row[0][0] == '/'){
            //         $this->stageNext();
            //         $this->stage = 1;
            //         break;
            //     }
            //     if ($row[0][0] == '#'){
            //         $this->stageNext();
            //         $this->stage = 2;
            //     }
            // }


            switch ($this->stage){
                case 0: //CTDT
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

                    if ($this->checkTrueAndSet([$ndt, $id_dt, $tddt, $time_dt], $this->CTDT))
                        $this->stage ++;
                case 1: // Loai kien thuc
                    if ($this->checkValue(
                        $this->ten_loai,
                        $row[0],
                        '/'
                    ))
                        $this->stageNext();
                    else break;
                case 2: // Khoi kien thuc
                    if ($row[0][0] === '*'){
                        $this->ten_KKT = $this->ten_loai;
                        $this->stageNext();
                    }else{
                        
                    }
                    if (!$this->checkValue(
                        $ten_KKT,
                        $row[0],
                        '#'
                    )){
                        $this->stageNext();
                    }
                case 3:
                    if (!$this->isTuChon){
                        array_push($this->BatBuoc, $this->getHP($row));
                    }else{
                        array_push($this->TuChon, $this->getHP($row));
                    }
                    $this->stage = 1;
            }

        }

        dd($this->loaiList, $this->KKTList);

    }

    function getGoiY($row){
        for ($i = 4; $i <= 12; $i++){
            if (strpos($row[$i], 'x') === false) continue;
            array_push($rs, [$row, 'hoc_ky_goi_y' => $i - 3]);
        }
        return $rs;
    }

    function checkValidRowHP($values){
        foreach($values as $value){
            if (isset($value) || trim($value) === '')
                return false;
        }
        return true;
    }

    function getHP($row){
        if (!$this->checkValidRowHP([$row[1], $row[2], $row[3]]))
            return null;
        $rs = HocPhan::where('id', $row[1])->first();
        if ($rs != null){
            $rs = new HocPhan();
        }

        $rs->id = $row[1];
        $rs->ten = $row[2];
        $rs->so_tin_chi = $row[3];
        $rs->hoc_phan_tuong_duong_id = $row[13];
        // dd($rs);
        return $this->getGoiY($rs);
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
