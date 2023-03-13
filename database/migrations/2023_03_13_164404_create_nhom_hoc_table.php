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
        Schema::create('nhom_hoc', function (Blueprint $table) {
            $table->integer('maNhomHoc')->primary();
            $table->integer('tenNhomHoc');
            $table->integer('soLuongSV');
            $table->integer('maHP')->index('maHP');
            $table->integer('maCB')->index('maCB');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nhom_hoc');
    }
};
