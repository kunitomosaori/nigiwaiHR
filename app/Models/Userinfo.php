<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userinfo extends Model
{
    use HasFactory;

    protected $table = 'userinfo';

    protected $fillable = [
        'name',
        'lid',
        'lpw',
        'kanri_flg'
    ];

    public $timestamps = false; // テーブルにcreated_at, updated_atのタイムスタンプがない場合

}
