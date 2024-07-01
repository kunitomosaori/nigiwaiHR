<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SheetPeriodSettings extends Model
{
    use HasFactory;

    protected $table = 'period_settings';

    protected $fillable = [
        'name',
        'start_month',
        'end_month',
    ];
}
