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
        Schema::table('sinh_vien', function (Blueprint $table) {
            $table->foreign(['maNganh'], 'sinhvien_ibfk_1')->references(['maNganh'])->on('nganh')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maNienKhoa'], 'sinhvien_ibfk_2')->references(['maNienKhoa'])->on('nien_khoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maKhoa'], 'sinhvien_ibfk_3')->references(['maKhoa'])->on('khoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sinh_vien', function (Blueprint $table) {
            $table->dropForeign('sinhvien_ibfk_1');
            $table->dropForeign('sinhvien_ibfk_2');
            $table->dropForeign('sinhvien_ibfk_3');
        });
    }
};
