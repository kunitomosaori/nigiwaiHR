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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // 1-10までをシート関係の権限管理に利用。20-
        DB::table('permissions')->insert([
            ['name' => '全権限'],
            ['name' => '評価権限'],
            ['name' => 'シート作成権限'],
            ['name' => 'シート終了権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'シート閲覧権限'],
            ['name' => 'ユーザー閲覧権限'],
            ['name' => 'ユーザー編集権限'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abilities');
    }
};
