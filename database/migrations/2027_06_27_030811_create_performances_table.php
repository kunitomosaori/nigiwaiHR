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
            $table->foreignUlid('sheet_id')->constrained('sheets');
            $table->integer('detail_type');
            $table->string('schedule');
            $table->string('self_comment');
            $table->string('supervisor_comment');
            $table->string('second_comment');
            $table->string('third_comment');
            $table->string('self_evaluation');
            $table->string('supervisor_evaluation');
            $table->string('second_evaluation');
            $table->string('third_evaluation');
            $table->string('final_evaluation');
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
