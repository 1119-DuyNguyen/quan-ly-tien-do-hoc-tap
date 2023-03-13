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
        Schema::table('chuong_trinh_dao_tao_hoc_phan', function (Blueprint $table) {
            $table->foreign(['maCTDT'], 'ctdt_hp_ibfk_1')->references(['maCTDT'])->on('chuong_trinh_dao_tao')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maHP'], 'ctdt_hp_ibfk_2')->references(['maHP'])->on('hoc_phan')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chuong_trinh_dao_tao_hoc_phan', function (Blueprint $table) {
            $table->dropForeign('ctdt_hp_ibfk_1');
            $table->dropForeign('ctdt_hp_ibfk_2');
        });
    }
};
