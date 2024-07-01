<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetStatus extends Model
{
    use HasFactory;

    protected $table = 'sheet_statuses';

    protected $fillable = [
        'status',
    ];

    public $timestamps = false; // タイムスタンプが不要な場合
}
