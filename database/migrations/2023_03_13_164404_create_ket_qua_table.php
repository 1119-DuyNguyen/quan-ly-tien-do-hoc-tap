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
        Schema::create('ket_qua', function (Blueprint $table) {
            $table->float('diemQuaTrinh', 10, 0);
            $table->float('diemThi', 10, 0);
            $table->float('TK_10', 10, 0);
            $table->char('TK_CH', 1);
            $table->float('TK_4', 10, 0);
            $table->string('KQ', 3);
            $table->date('thoiDiem');
            $table->integer('maHP');
            $table->integer('mssv')->index('mssv');

            $table->primary(['maHP', 'mssv']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ket_qua');
    }
};
