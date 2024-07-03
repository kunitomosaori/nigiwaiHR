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
            $table->ulid('id')->primary();
            $table->foreignId('sheet_image_id')->constrained('sheet_images');
            $table->foreignId('sheet_status_id')->constrained('sheet_statuses');
            $table->foreignId('sheet_company_goal_id')->constrained('sheet_company_goals');
            $table->string('personal_goal');
            $table->timestamps();
            $table->foreignId('period_setting_id')->constrained('sheet_period_settings');
        });

        // テストデータの挿入
        DB::table('sheets')->insert([
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 1,
                'sheet_status_id' => 1,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標1",
                'created_at' => now(),
                'period_setting_id' => 1,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 1,
                'sheet_status_id' => 2,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標2",
                'created_at' => now(),
                'period_setting_id' => 1,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 1,
                'sheet_status_id' => 3,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標3",
                'created_at' => now(),
                'period_setting_id' => 2,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 1,
                'sheet_status_id' => 4,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標4",
                'created_at' => now(),
                'period_setting_id' => 3,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 2,
                'sheet_status_id' => 1,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標5",
                'created_at' => now(),
                'period_setting_id' => 4,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 2,
                'sheet_status_id' => 2,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標6",
                'created_at' => now(),
                'period_setting_id' => 5,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 3,
                'sheet_status_id' => 3,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標7",
                'created_at' => now(),
                'period_setting_id' => 6,
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'sheet_image_id' => 3,
                'sheet_status_id' => 4,
                'sheet_company_goal_id' => 1,
                'personal_goal' => "目標8",
                'created_at' => now(),
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
