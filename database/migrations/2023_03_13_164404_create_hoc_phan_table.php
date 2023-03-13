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
        Schema::create('hoc_phan', function (Blueprint $table) {
            $table->integer('maHP')->primary();
            $table->integer('tenHP');
            $table->integer('soTC');
            $table->integer('soTietLT');
            $table->integer('batBuoc');
            $table->integer('tinhVaoTichLuy');
            $table->integer('soTietTH');
            $table->integer('ptKT');
            $table->integer('ptThi');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hoc_phan');
    }
};
