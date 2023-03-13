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
        Schema::table('yeu_cau', function (Blueprint $table) {
            $table->foreign(['maCTDT'], 'yeucau_ibfk_1')->references(['maCTDT'])->on('chuong_trinh_dao_tao')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maCC'], 'yeucau_ibfk_2')->references(['maCC'])->on('chung_chi')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('yeu_cau', function (Blueprint $table) {
            $table->dropForeign('yeucau_ibfk_1');
            $table->dropForeign('yeucau_ibfk_2');
        });
    }
};
