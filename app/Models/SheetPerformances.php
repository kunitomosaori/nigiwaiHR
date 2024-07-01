<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetPerformance extends Model
{
    use HasFactory;

    protected $table = 'sheet_performances';

    protected $fillable = [
        'sheet_id',
        'goal',
        'schedule',
        'self_comment',
        'supervisor_comment',
        'second_comment',
        'third_comment',
        'self_evaluation',
        'supervisor_evaluation',
        'second_evaluation',
        'third_evaluation',
        'final_evaluation',
        'weight',
    ];

    public $timestamps = false; // タイムスタンプが不要な場合

    // Userテーブルとリレーションを設定するような場合下記のような記述を追加する必要がある
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}
