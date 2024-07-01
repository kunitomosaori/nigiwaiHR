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
            $table->foreignId('sheet_company_goal_id')->constrained('sheet_company_goals');
            $table->string('title');
            $table->timestamps();
            $table->integer('created_by_id');
            $table->foreignId('period_setting_id')->constrained('period_settings');
        });

        // テストデータの挿入
        DB::table('sheets')->insert([
            [
                'user_id' => 1,
                'sheet_status_id' => 1,
                'sheet_company_goal_id' => 1,
                'title' => '2024上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_setting_id' => 1,
            ],
            [
                'user_id' => 2,
                'sheet_status_id' => 2,
                'sheet_company_goal_id' => 1,
                'title' => '2024上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_setting_id' => 1,
            ],
            [
                'user_id' => 3,
                'sheet_status_id' => 3,
                'sheet_company_goal_id' => 1,
                'title' => '2024下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_setting_id' => 2,
            ],
            [
                'user_id' => 4,
                'sheet_status_id' => 4,
                'sheet_company_goal_id' => 1,
                'title' => '2025上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 1,
                'period_setting_id' => 3,
            ],
            [
                'user_id' => 1,
                'sheet_status_id' => 1,
                'sheet_company_goal_id' => 1,
                'title' => '2025下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_setting_id' => 4,
            ],
            [
                'user_id' => 1,
                'sheet_status_id' => 2,
                'sheet_company_goal_id' => 1,
                'title' => '2026上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_setting_id' => 5,
            ],
            [
                'user_id' => 1,
                'sheet_status_id' => 3,
                'sheet_company_goal_id' => 1,
                'title' => '2026下半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_setting_id' => 6,
            ],
            [
                'user_id' => 1,
                'sheet_status_id' => 4,
                'sheet_company_goal_id' => 1,
                'title' => '2027上半期 スキルチェックシート',
                'created_at' => now(),
                'created_by_id' => 2,
                'period_setting_id' => 7,
            ],
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
