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
        Schema::create('sheets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('sheet_status_id')->constrained('sheet_statuses');
            $table->string('title');
            $table->timestamps();
        });

        // テストデータの挿入
        DB::table('sheets')->insert([
            'user_id' => 1,
            'sheet_status_id' => 1,
            'title' => '2024上半期 スキルチェックシート',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheets');
    }
};
