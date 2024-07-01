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
        Schema::create('sheet_performances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sheet_id')->constrained('sheets');
            $table->string('goal');
            $table->string('schedule');
            $table->string('self_comment');
            $table->string('supervisor_comment');
            $table->string('second_comment');
            $table->string('third_comment');
            $table->integer('self_evaluation');
            $table->integer('supervisor_evaluation');
            $table->integer('second_evaluation');
            $table->integer('third_evaluation');
            $table->integer('final_evaluation');
            $table->integer('weight');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_performances');
    }
};
