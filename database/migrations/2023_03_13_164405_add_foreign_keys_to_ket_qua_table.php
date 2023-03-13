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
        Schema::table('ket_qua', function (Blueprint $table) {
            $table->foreign(['maHP'], 'ketqua_ibfk_1')->references(['maHP'])->on('hoc_phan')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['mssv'], 'ketqua_ibfk_2')->references(['mssv'])->on('sinh_vien')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ket_qua', function (Blueprint $table) {
            $table->dropForeign('ketqua_ibfk_1');
            $table->dropForeign('ketqua_ibfk_2');
        });
    }
};
