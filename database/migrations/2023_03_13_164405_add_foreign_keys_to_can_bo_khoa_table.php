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
        Schema::table('can_bo_khoa', function (Blueprint $table) {
            $table->foreign(['maKhoa'], 'cbthuockhoa_ibfk_1')->references(['maKhoa'])->on('khoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maCB'], 'cbthuockhoa_ibfk_2')->references(['maCB'])->on('can_bo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('can_bo_khoa', function (Blueprint $table) {
            $table->dropForeign('cbthuockhoa_ibfk_1');
            $table->dropForeign('cbthuockhoa_ibfk_2');
        });
    }
};
