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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->foreignId('position_id')->constrained('user_positions');
            $table->foreignId('grade_id')->constrained('user_grades');
            $table->foreignId('department_id')->constrained('user_departments');
            $table->foreignId('supervisor_id')->nullable()->constrained('users');
        });

        // テストデータの挿入
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@example.com',
            'password' => bcrypt('testtest'),
            'position_id' => 1, // 社長
            'grade_id' => 7, // 社長
            'department_id' => 3, // 人事部
            'supervisor_id' => null, // 上司なし
            'created_at' => now(), // 追加
            'updated_at' => now(), // 追加
        ]);
        // テストデータの挿入
        DB::table('users')->insert([
            'name' => 'test2',
            'email' => 'test2@example.com',
            'password' => bcrypt('testtest'),
            'position_id' => 2, // 部長
            'grade_id' => 3, // 等級3
            'department_id' => 1, // 営業部
            'supervisor_id' => 1, // 社長が上司
            'created_at' => now(), // 追加
            'updated_at' => now(), // 追加
        ]);
        // テストデータの挿入
        DB::table('users')->insert([
            'name' => 'test3',
            'email' => 'test3@example.com',
            'password' => bcrypt('testtest'),
            'position_id' => 3, // 社員
            'grade_id' => 3, // 等級3
            'department_id' => 1, // 営業部
            'supervisor_id' => 2, // 部長が上司
            'created_at' => now(), // 追加
            'updated_at' => now(), // 追加
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
