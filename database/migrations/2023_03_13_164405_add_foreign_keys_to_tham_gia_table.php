<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tham_gia', function (Blueprint $table) {
            $table->foreign(['mssv'], 'thamgia_ibfk_1')->references(['mssv'])->on('sinh_vien')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maLopHoc'], 'thamgia_ibfk_2')->references(['maNhomHoc'])->on('nhom_hoc')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tham_gia', function (Blueprint $table) {
            $table->dropForeign('thamgia_ibfk_1');
            $table->dropForeign('thamgia_ibfk_2');
        });
    }
};
