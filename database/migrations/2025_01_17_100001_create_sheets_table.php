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
            $table->foreignId('evaluatee_id')->constrained('users');
            $table->foreignId('sheetImage_id')->constrained('sheet_images');
            $table->foreignId('sheet_status_id')->constrained('sheet_statuses');
            $table->string('personal_goal');
            $table->timestamps();
        });

        // テストデータの挿入
        DB::table('sheets')->insert([
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 1,
                'sheetImage_id' => 1,
                'sheet_status_id' => 1,
                'personal_goal' => "目標1",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 1,
                'sheetImage_id' => 2,
                'sheet_status_id' => 2,
                'personal_goal' => "目標2",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 1,
                'sheetImage_id' => 3,
                'sheet_status_id' => 3,
                'personal_goal' => "目標3",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 1,
                'sheetImage_id' => 4,
                'sheet_status_id' => 4,
                'personal_goal' => "目標4",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 2,
                'sheetImage_id' => 5,
                'sheet_status_id' => 1,
                'personal_goal' => "目標5",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 2,
                'sheetImage_id' => 6,
                'sheet_status_id' => 2,
                'personal_goal' => "目標6",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 2,
                'sheetImage_id' => 7,
                'sheet_status_id' => 3,
                'personal_goal' => "目標7",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) \Illuminate\Support\Str::ulid(),
                'evaluatee_id' => 2,
                'sheetImage_id' => 8,
                'sheet_status_id' => 4,
                'personal_goal' => "目標8",
                'created_at' => now(),
                'updated_at' => now(),
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
