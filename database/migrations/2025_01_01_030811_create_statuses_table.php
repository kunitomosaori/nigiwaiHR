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
        Schema::create('sheet_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('status');
        });

        // テストデータの挿入
        DB::table('sheet_statuses')->insert([
            ['status' => '未提出'],
            ['status' => '上司待ち'],
            ['status' => '承認済み'],
            ['status' => '上司評価待ち'],
            ['status' => '二次評価待ち'],
            ['status' => '最終承認待ち'],
            ['status' => 'シート終了'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_statuses');
    }
};
