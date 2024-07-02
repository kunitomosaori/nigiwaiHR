<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetPeriodSetting extends Model
{
    use HasFactory;

    protected $table = 'sheet_period_setting';

    protected $fillable = [
        'name',
        'start_month',
        'end_month',
    ];
}
