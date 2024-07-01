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
        Schema::create('period_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('start_month');
            $table->integer('end_month');
        });

        // テストデータの挿入
        DB::table('period_settings')->insert([
            [
                'name' => '2024上半期',
                'start_month' => 1,
                'end_month' => 6,
            ],
            [
                'name' => '2024下半期',
                'start_month' => 7,
                'end_month' => 12,
            ],
            [
                'name' => '2025上半期',
                'start_month' => 1,
                'end_month' => 6,
            ],
            [
                'name' => '2025下半期',
                'start_month' => 7,
                'end_month' => 12,
            ],
            [
                'name' => '2026上半期',
                'start_month' => 1,
                'end_month' => 6,
            ],
            [
                'name' => '2026下半期',
                'start_month' => 7,
                'end_month' => 12,
            ],
            [
                'name' => '2027上半期',
                'start_month' => 1,
                'end_month' => 6,
            ],
            [
                'name' => '2027下半期',
                'start_month' => 7,
                'end_month' => 12,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('period_settings');
    }
};
