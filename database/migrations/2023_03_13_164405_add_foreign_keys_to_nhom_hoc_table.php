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
        Schema::table('nhom_hoc', function (Blueprint $table) {
            $table->foreign(['maHP'], 'nhomhoc_ibfk_1')->references(['maHP'])->on('hoc_phan')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['maCB'], 'nhomhoc_ibfk_2')->references(['maCB'])->on('can_bo')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('nhom_hoc', function (Blueprint $table) {
            $table->dropForeign('nhomhoc_ibfk_1');
            $table->dropForeign('nhomhoc_ibfk_2');
        });
    }
};
