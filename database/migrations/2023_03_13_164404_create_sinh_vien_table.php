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
        Schema::create('sinh_vien', function (Blueprint $table) {
            $table->integer('mssv')->primary();
            $table->integer('hoTen');
            $table->integer('soTCPhaiHocLai');
            $table->integer('tongTCDaHoc');
            $table->integer('maNganh')->index('maNganh');
            $table->integer('maNienKhoa')->index('maNienKhoa');
            $table->integer('maKhoa')->index('maKhoa');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sinh_vien');
    }
};
