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
        Schema::create('sheet_company_goals', function (Blueprint $table) {
            $table->id();
            $table->string('goal');
            $table->integer('period');
        });

        // テストデータの挿入
        DB::table('sheet_company_goals')->insert([
            'goal' => '2024上半期の全社目標',
            'period' => 202401,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_company_goals');
    }
};
