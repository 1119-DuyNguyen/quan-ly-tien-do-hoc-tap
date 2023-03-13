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
        Schema::table('chuong_trinh_dao_tao', function (Blueprint $table) {
            $table->foreign(['maNganh'], 'ctdt_ibfk_1')->references(['maNganh'])->on('nganh')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chuong_trinh_dao_tao', function (Blueprint $table) {
            $table->dropForeign('ctdt_ibfk_1');
        });
    }
};
