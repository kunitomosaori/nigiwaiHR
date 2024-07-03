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
        Schema::create('sheet_images', function (Blueprint $table) {
            $table->id('id');
            $table->string('title');
            $table->timestamps();
            $table->foreignId('created_by_id')->constrained('users');
            $table->foreignId('period_id')->constrained('sheet_period_settings');
        });

        // テストデータの挿入
        DB::table('sheet_images')->insert([
            [
                'id' => 1,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_id' => 1,
            ],
            [
                'id' => 2,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 2,
            ],
            [
                'id' => 3,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 3,
                'period_id' => 3,
            ],
            [
                'id' => 4,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 4,
                'period_id' => 4,
            ],
            [
                'id' => 5,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 5,
                'period_id' => 5,
            ],
            [
                'id' => 6,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_id' => 6,
            ],
            [
                'id' => 7,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 7,
            ],
            [
                'id' => 8,
                'title' => 'スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 3,
                'period_id' => 8,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_images');
    }
};
