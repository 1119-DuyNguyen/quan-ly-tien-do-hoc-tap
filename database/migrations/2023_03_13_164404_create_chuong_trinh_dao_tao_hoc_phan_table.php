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
        Schema::create('chuong_trinh_dao_tao_hoc_phan', function (Blueprint $table) {
            $table->integer('HKKhuyenNghi');
            $table->integer('maCTDT');
            $table->integer('maHP')->index('maHP');

            $table->primary(['maCTDT', 'maHP']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chuong_trinh_dao_tao_hoc_phan');
    }
};
