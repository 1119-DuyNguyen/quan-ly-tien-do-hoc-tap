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
        Schema::create('noi_dung_nhom_hoc', function (Blueprint $table) {
            $table->integer('tenND');
            $table->integer('loaiND');
            $table->integer('maND')->primary();
            $table->integer('chiTietND');
            $table->integer('maNhomHoc')->index('maLopHoc');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('noi_dung_nhom_hoc');
    }
};
