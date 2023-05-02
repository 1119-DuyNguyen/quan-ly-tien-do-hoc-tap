<?php

namespace App\Http\Controllers\DataImport;

use App\Models\Users\Students\TrainingProgram\ChuongTrinhDaoTao;
use App\Models\Users\Students\TrainingProgram\Subjects\LoaiKienThuc;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKKTTuChon;
use App\Models\Users\Students\TrainingProgram\Subjects\HocPhanKKTBatBuoc;
use App\Models\Users\Students\TrainingProgram\Subjects\KhoiKienThuc;

class KhoiKienThucImportInfo
{

    // private $loai_kien_thuc = 0;
    // private $tu_chon = false;
    // private $ctdt = false;
    // private $

    function collection(){

    }

    // public $inputKey = "giang-vien";
    public function RowsToCollection(){
        // return $collection;
        return function ($rows){
        $nganh_dao_tao = false;
        $ma_nganh = false;
        $khoa = false;
        $trinh_do_dao_tao = false;
        $thoi_gian_dao_tao = false;
        $chu_ky = false;
        $tong_tin_chi = false;
        $tmp = null;
        $data = null;
        try {
            foreach ($rows as $row){

                if ($data == null){

                    $setValueFromKeyStr($nganh_dao_tao, $row[0], 'Ngành đào tạo: ');

                    $setValueFromKeyStr($ma_nganh, $row[0], 'Mã ngành: ');

                    $setValueFromKeyStr($khoa, $row[0], 'Khoa: ');

                    $setValueFromKeyStr($trinh_do_dao_tao, $row[0], 'Trình độ đào tạo: ');

                    $setValueFromKeyStr($tong_tin_chi, $row[0], 'Tín chỉ tối thiểu: ');

                    $setValueFromKeyStr($thoi_gian_dao_tao, $row[0], 'Thời gian đào tạo: ');
                    if ($thoi_gian_dao_tao != false)
                    // dd($time_dt);
                    $thoi_gian_dao_tao = $getFloatFromStr($thoi_gian_dao_tao);

                    $setValueFromKeyStr($chu_ky, $row[0], 'Chu kỳ: ');

                    if (!$checkTrueAndSet([$nganh_dao_tao, $khoa, $ma_nganh, $trinh_do_dao_tao, $thoi_gian_dao_tao, $chu_ky, $tong_tin_chi], $CTDT))
                        continue;
                    else {
                        $nam_bd = intval(explode('-', $chu_ky)[0]);
                        $nam_kt = intval(explode('-', $chu_ky)[1]);
                    }
                }


                // dd($CTDT);
                //Loai
                if ($setValueFromKeyStr($ten_loai, $row[0], '/')){
                    $ten_KKT = null;
                    // $isTuChon = true;
                    continue;
                };
                // if (!isset($ten_loai))
                //     continue;

                if ($setValueFromKeyStr($ten_KKT, $row[0], '#')){
                    $tmp = '';
                    continue;
                }

                if ($ten_KKT == null){
                    if ($setValueFromKeyStr($tmp, $row[0], '*'))
                        $ten_KKT = $ten_loai;
                    continue;
                }

                if ($setValueFromKeyStr($tmp, $row[0], '*')) {
                    // $isTuChon = !$isTuChon;
                    continue;
                }
                if (!isset($CTDT[$ten_loai][$ten_KKT])){
                    // $CTDT[$ten_loai] = [];
                    // $CTDT[$ten_loai][$ten_KKT] = [];
                    $CTDT[$ten_loai][$ten_KKT]['Bat-buoc'] = [];
                    $CTDT[$ten_loai][$ten_KKT]['Tu-chon'] = [];
                    // dd([$ten_loai, $ten_KKT]);
                }
                // dd($getHP($row), $row);
                if (strpos($tmp, 'tự chọn') === false){
                    array_push($CTDT[$ten_loai][$ten_KKT]['Bat-buoc'], $getHP($row));
                    // dd($CTDT[$ten_loai][$ten_KKT]['Tu-chon'], $getHP($row));
                }else
                    array_push($CTDT[$ten_loai][$ten_KKT]['Tu-chon'], $getHP($row));

            }

            // dd(intval($tong_tin_chi));
            // ##Kết quả nằm ở đây: Mỗi 1 phần tử trong key 'Tu-chon' hoặc 'Bat-buoc' sẽ là 1 mảng có 2 phần tử,
            // pt1 là model học phần
            // pt2 là model mảng chứa các số từ 1 - 9 ứng với học kì gợi ý là học kì mấy, ex: [1,3,4] thì hk 1 và 3 và 4 là hk gợi ý

            // dd($ten_loai);
            if (!isset($CTDT))
                return [
                    'err' => true,
                    'mess' => 'Thiếu hoặc sai thông tin chương trình đào tạo'
                ];

            // $nganh = Nganh::where('ma_nganh', $ma_nganh)->first();
            // if ($nganh == null)
                $nganh = Nganh::updateOrCreate([
                    'ma_nganh' => $ma_nganh,
                ],
                [
                    'ten' => $nganh_dao_tao,
                    'khoa_id' => Khoa::firstOrCreate([
                        'ma_khoa' => Str::slug($khoa, '-')
                    ],
                    [
                        'ten' => $khoa
                    ])->id
                ]);
            // $nganh->save();
            // dd($nganh);

            // $chu_kyModel = ChuKy::where('nam_bat_dau', $nam_bd)->where('nam_ket_thuc', $nam_kt)->first();
            $chu_kyModel = ChuKy::updateOrCreate([
                'nam_bat_dau' => $nam_bd,
                'nam_ket_thuc' => $nam_kt,
            ],
            [
                'ten' => $chu_ky
            ]);
            // dd(intval($tong_tin_chi));
            $ctdt = ChuongTrinhDaoTao::updateOrCreate([
                'ten' => 'Chương trình đào tạo '.$nganh_dao_tao.' chu kỳ '.$chu_ky,
                'chu_ky_id' => $chu_kyModel->id,
            ],
            [
                'trinh_do_dao_tao' => $trinh_do_dao_tao,
                'thoi_gian_dao_tao' => $thoi_gian_dao_tao,
                'nganh_id' => $nganh->id,
                'tong_tin_chi' => intval($tong_tin_chi)
            ]);

            // dd($CTDT);

            foreach($CTDT as $key=>$value){
                if (gettype($key) == 'integer') continue;
                $value = array_pop($value);

                $loai_kt = LoaiKienThuc::updateOrCreate([
                    'ten' => $key,
                ],[
                    'dai_cuong' => strpos($key, 'đại cương') !== false ? 1 : 0

                ]);

                // dd(key($value));

                $kkt = KhoiKienThuc::updateOrCreate([
                    'loai_kien_thuc_id' => $loai_kt->id,
                    'chuong_trinh_dao_tao_id' => $ctdt->id
                ],[
                    'ten' => key($value),
                ]);
                HocPhanKKTBatBuoc::where('khoi_kien_thuc_id', $kkt->id)->delete();
                HocPhanKKTTuChon::where('khoi_kien_thuc_id', $kkt->id)->delete();

                // dd($ctdt->id, $loai_kt->id);
                // if ($value['Bat-buoc'] != null)
                foreach($value['Bat-buoc'] as $hp){
                    if ($hp[1] == null)
                        HocPhanKKTBatBuoc::create([
                            'hoc_phan_id' => $hp[0]->id,
                            'hoc_ky_goi_y' => -1,
                            'khoi_kien_thuc_id' => $kkt->id
                        ]);
                    else
                    foreach($hp[1] as $hk){
                        // dd($hp[0]);
                        HocPhanKKTBatBuoc::create([
                            'hoc_phan_id' => $hp[0]->id,
                            'hoc_ky_goi_y' => $hk,
                            'khoi_kien_thuc_id' => $kkt->id
                        ]);
                        // dd($bat_buoc);
                    }
                }
                // if ($value['Tu-chon'] != null)
                foreach($value['Tu-chon'] as $hp){
                    if ($hp[1] == null)
                        HocPhanKKTTuChon::create([
                            'hoc_phan_id' => $hp[0]->id,
                            'hoc_ky_goi_y' => -1,
                            'khoi_kien_thuc_id' => $kkt->id
                        ]);
                    else
                    foreach($hp[1] as $hk){

                        HocPhanKKTTuChon::create([
                            'hoc_phan_id' => $hp[0]->id,
                            'hoc_ky_goi_y' => $hk,
                            'khoi_kien_thuc_id' => $kkt->id
                        ]);
                    }
                }
            }
        }catch (QueryException $e){
            $err = true;
            $mess = $e;
        }
        };
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

    public function setValueFromKeyStr(&$value , $str, $key){
        $key_pos = strpos($str, $key);
        if ($key_pos !== false){
            $value = substr($str, $key_pos + strlen($key), strlen($str) - ($key_pos + strlen($key)));
            return true;
            // dd($value);
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

    public function RowRules(){
        return [

        ];
    }

}
