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
        Schema::create('chuong_trinh_dao_tao', function (Blueprint $table) {
            $table->integer('maCTDT')->primary();
            $table->integer('tenCTDT');
            $table->integer('batDau');
            $table->integer('ketThuc');
            $table->integer('tongTC');
            $table->integer('thoiGian');
            $table->integer('maNganh')->index('maNganh');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chuong_trinh_dao_tao');
    }
};
