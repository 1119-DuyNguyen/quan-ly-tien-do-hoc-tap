<?php

namespace App\Http\Controllers\DataImport;


class KhoiKienThucImportInfo
{

    // private $loai_kien_thuc = 0;
    // private $tu_chon = false;
    // private $ctdt = false;
    // private $


    // public $inputKey = "giang-vien";
    public function RowsToCollection(){
        return function ($rows){

            foreach($rows as $row){
                if (strpos($row[0], 'Ngành đào tạo:') == 1)
            }

        };
    }



    public function RowRules(){
        return [

        ];
    }

}
