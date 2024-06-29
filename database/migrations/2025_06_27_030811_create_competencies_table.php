<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sheet_competencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sheet_id')->constrained('sheets');
            $table->foreignId('competency_id')->constrained('sheet_competency_items');
            $table->integer('self_evaluation');
            $table->integer('supervisor_evaluation');
            $table->integer('weight');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_competencies');
    }
};
