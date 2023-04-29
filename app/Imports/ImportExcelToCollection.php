<?php

namespace App\Imports;

use App\Models\Nganh;
use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
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
use DB;

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

    private $ten_KKT = null;
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



    public function setValueFromKeyStr(&$value , $str, $key){
        $key_pos = strpos($str, $key);
        if ($key_pos !== false){
            $value = substr($str, $key_pos + strlen($key), strlen($str) - ($key_pos + strlen($key)));
            return true;
            // dd($value);
        }
        return false;
    }

    public function getFloatFromStr($str){
        // dd($str);
        $rs = (float) filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        if ($rs !== 0.0){
            // dd($rs);
            return $rs;
        }
        return false;
    }

    public function checkTrueAndSet($values, &$set){
        // return $values;
        foreach ($values as $index=>$value){
            // dd($index, $value);
            if ($value === false)
                $rs[$index] = $value;
        }
        if (isset($rs)) return false;
        $set = $values;
        return true;
    }






    public function collection(\Illuminate\Support\Collection $rows){

        // $test = 'abc';
        // $test = $this->getValueFromKeyStr('abc', 'd');
        // dd($test);
        $nganh_dao_tao = false;
        $ma_nganh = false;
        $trinh_do_dao_tao = false;
        $thoi_gian_dao_tao = false;
        $chu_ky = false;
        $tmp = null;
        foreach ($rows as $row){

            if ($this->CTDT == null){

                $this->setValueFromKeyStr($nganh_dao_tao, $row[0], 'Ngành đào tạo: ');

                $this->setValueFromKeyStr($ma_nganh, $row[0], 'Mã ngành: ');

                $this->setValueFromKeyStr($trinh_do_dao_tao, $row[0], 'Trình độ đào tạo: ');

                $this->setValueFromKeyStr($thoi_gian_dao_tao, $row[0], 'Thời gian đào tạo: ');
                if ($thoi_gian_dao_tao != false)
                // dd($time_dt);
                $thoi_gian_dao_tao = $this->getFloatFromStr($thoi_gian_dao_tao);

                $this->setValueFromKeyStr($chu_ky, $row[0], 'Chu kỳ: ');

                if (!$this->checkTrueAndSet([$nganh_dao_tao, $ma_nganh, $trinh_do_dao_tao, $thoi_gian_dao_tao, $chu_ky], $this->CTDT))
                    continue;
            }


            // dd($this->CTDT);
            //Loai
            if ($this->setValueFromKeyStr($this->ten_loai, $row[0], '/')){
                $this->ten_KKT = null;
                // $this->isTuChon = true;
                continue;
            };
            // if (!isset($this->ten_loai))
            //     continue;

            if ($this->setValueFromKeyStr($this->ten_KKT, $row[0], '#'))
                continue;

            if ($this->ten_KKT == null){
                if ($this->setValueFromKeyStr($tmp, $row[0], '*'))
                    $this->ten_KKT = $this->ten_loai;
                continue;
            }

            if ($this->setValueFromKeyStr($tmp, $row[0], '*')) {
                // $this->isTuChon = !$this->isTuChon;
                continue;
            }
            if (!isset($this->CTDT[$this->ten_loai][$this->ten_KKT])){
                // $this->CTDT[$this->ten_loai] = [];
                // $this->CTDT[$this->ten_loai][$this->ten_KKT] = [];
                $this->CTDT[$this->ten_loai][$this->ten_KKT]['Bat-buoc'] = [];
                $this->CTDT[$this->ten_loai][$this->ten_KKT]['Tu-chon'] = [];
                // dd([$this->ten_loai, $this->ten_KKT]);
            }
            // dd($this->getHP($row), $row);
            if (strpos($tmp, 'tự chọn') !== false){
                array_push($this->CTDT[$this->ten_loai][$this->ten_KKT]['Tu-chon'], $this->getHP($row));
                // dd($this->CTDT[$this->ten_loai][$this->ten_KKT]['Tu-chon'], $this->getHP($row));
            }else
                array_push($this->CTDT[$this->ten_loai][$this->ten_KKT]['Bat-buoc'], $this->getHP($row));

        }

        // dd($this->CTDT);
        // ##Kết quả nằm ở đây: Mỗi 1 phần tử trong key 'Tu-chon' hoặc 'Bat-buoc' sẽ là 1 mảng có 2 phần tử,
        // pt1 là model học phần
        // pt2 là model mảng chứa các số từ 1 - 9 ứng với học kì gợi ý là học kì mấy, ex: [1,3,4] thì hk 1 và 3 và 4 là hk gợi ý

        // dd($this->ten_loai);
        if (!isset($this->CTDT))
            return [
                'err' => true,
                'mess' => 'Thiếu hoặc sai thông tin chương trình đào tạo'
            ];

        $nganh = new Nganh([

        ]);

        $ctdt = new ChuongTrinhDaoTao([
            'id' => $this->CTDT[1],
            'ten' => $this->CTDT[0],
            'trinh_do_dao_tao' => $this->CTDT[2],
            'thoi_gian_dao_tao' => $this->CTDT[3]
        ]);

        dd($ctdt->save());

        foreach($this->CTDT as $key=>$value){
            if (gettype($key) == 'integer') continue;
            // dd(DB::insert('insert into loai_kien_thuc (ten, dai_cuong) values (?, ?)',[$key, strpos($key, 'đại cương') !== false ? 1 : 0]));

            // dd(DB::table('loai_kien_thuc')->insert([
            //     'ten' => $key,
            //     'dai_cuong' => strpos($key, 'đại cương') !== false ? 1 : 0
            // ]));



            // DB:insert('inser into khoi_kien_thuc (id, ten, ')

            foreach($value['Bat-buoc'] as $hp){
                $hp[0]->save();
                foreach($hp[0] as $hk){
                    // DB::insert('insert into hoc_phan_kkt_bat_buoc (hoc_phan_id, hoc_ky_goi_y, khoi_kien_thuc_id) values (?, ?, ?)',
                    // [$hp[0]->id, $hk, $])
                }
            }
        }


    }

    function getGoiY($row){
        $rs = [];
        for ($i = 4; $i <= 12; $i++){
            if (strpos($row[$i], 'x') === false) continue;
            array_push($rs, $i - 3);
        }
        return $rs;
    }

    function checkValidRowHP($values){
        foreach($values as $value){
            if (!isset($value) || trim($value) === '')
                // dd('test');
                return false;
        }
        return true;
    }

    function getHP($row){
        if (!$this->checkValidRowHP([$row[1], $row[2], $row[3]]))
            return null;
        $rs = HocPhan::where('id', $row[1])->first();
        if ($rs == null){
            $rs = new HocPhan();
        }
        $rs->id = $row[1];
        $rs->ten = $row[2];
        $rs->so_tin_chi = $row[3];
        $rs->hoc_phan_tuong_duong_id = $row[13];

        // dd($rs);
        return [$rs->ten, $this->getGoiY($row)];
        // ##ĐÁNH DẤU CHO TEAM: đổi $rs->ten thành $rs để trả về model (->ten) để dễ nhìn kết quả thôi
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
