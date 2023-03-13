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
        Schema::create('can_bo_khoa', function (Blueprint $table) {
            $table->integer('maKhoa');
            $table->integer('maCB')->index('maCB');

            $table->primary(['maKhoa', 'maCB']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('can_bo_khoa');
    }
};
