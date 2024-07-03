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
        Schema::create('connections_user_sheet', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('sheetImage_id')->constrained('sheet_images');
            $table->string('role');
            $table->timestamps();
        });

        // テストデータの挿入
        DB::table('connections_user_sheet')->insert([
            [
                'user_id' => 1,
                'sheetImage_id' => 1,
                'role' => 'evaluatee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 2,
                'role' => 'evaluatee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 3,
                'role' => 'evaluatee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 4,
                'role' => 'evaluatee',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 5,
                'role' => 'evaluator',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 6,
                'role' => 'evaluator',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'sheetImage_id' => 7,
                'role' => 'evaluator',
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
        Schema::dropIfExists('connections_user_sheet');
    }
};

