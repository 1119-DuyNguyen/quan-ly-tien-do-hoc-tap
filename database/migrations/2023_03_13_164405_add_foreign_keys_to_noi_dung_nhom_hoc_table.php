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
        Schema::table('noi_dung_nhom_hoc', function (Blueprint $table) {
            $table->foreign(['maNhomHoc'], 'ndnhomhoc_ibfk_1')->references(['maNhomHoc'])->on('nhom_hoc')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('noi_dung_nhom_hoc', function (Blueprint $table) {
            $table->dropForeign('ndnhomhoc_ibfk_1');
        });
    }
};
