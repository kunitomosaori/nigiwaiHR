<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_grades', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // 等級データを挿入
        DB::table('user_grades')->insert([
            ['name' => '等級1'],
            ['name' => '等級2'],
            ['name' => '等級3'],
            ['name' => '等級4'],
            ['name' => '等級5'],
            ['name' => '等級6'],
            ['name' => '社長'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_grades');
    }
};
