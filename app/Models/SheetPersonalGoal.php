<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetPersonalGoal extends Model
{
    use HasFactory;

    protected $table = 'sheet_personal_goals';

    protected $fillable = [
        'sheet_id',
        'goal',
    ];

    public $timestamps = false; // タイムスタンプが不要な場合

    // Userテーブルとリレーションを設定するような場合下記のような記述を追加する必要がある
    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }
}
