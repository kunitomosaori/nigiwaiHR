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
        Schema::create('sheet_competency_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // テストデータの挿入
        DB::table('sheet_competency_items')->insert([
            [
                'name' => "職務技能能力",
                
            ],
            [
                'name' => "判断力",
                
            ],
            [
                'name' => "提言力",
                
            ],
            [
                'name' => "営業提案力",
                
            ],
            [
                'name' => "相手の気持を知る",
                
            ],
            [
                'name' => "対人傾聴力",
                
            ],
            [
                'name' => "論理的思考",
                
            ],
            [
                'name' => "伝達力",
                
            ],
            [
                'name' => "発想力",
                
            ],
            [
                'name' => "分析力",
                
            ],
            
        ]);
    }

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sheet_competency_items');
    }
};
