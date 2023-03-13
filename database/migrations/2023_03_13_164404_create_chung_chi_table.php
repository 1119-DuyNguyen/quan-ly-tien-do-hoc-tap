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
        Schema::create('chung_chi', function (Blueprint $table) {
            $table->integer('maCC')->primary();
            $table->string('tenCC', 50);
            $table->text('ghiChu');
            $table->integer('mssv')->index('mssv');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chung_chi');
    }
};
