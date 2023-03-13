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
        Schema::create('tham_gia', function (Blueprint $table) {
            $table->integer('mssv');
            $table->integer('maLopHoc')->index('maLopHoc');

            $table->primary(['mssv', 'maLopHoc']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tham_gia');
    }
};
