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
            $table->integer('created_by_id');
            $table->foreignId('period_id')->constrained('sheet_period_settings');
        });

        // テストデータの挿入
        DB::table('sheet_images')->insert([
            [
                'id' => 1,
                'title' => '2024上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_id' => 1,
            ],
            [
                'id' => 2,
                'title' => '2024下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_id' => 2,
            ],
            [
                'id' => 3,
                'title' => '2025上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_id' => 3,
            ],
            [
                'id' => 4,
                'title' => '2025下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 4,
            ],
            [
                'id' => 5,
                'title' => '2026上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 5,
            ],
            [
                'id' => 6,
                'title' => '2026下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 6,
            ],
            [
                'id' => 7,
                'title' => '2027上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_id' => 7,
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
