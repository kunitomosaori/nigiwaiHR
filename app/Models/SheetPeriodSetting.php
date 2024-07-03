<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SheetPeriodSetting extends Model
{
    use HasFactory;

    protected $table = 'sheet_period_settings';

    protected $fillable = [
        'name',
        'start_month',
        'end_month',
    ];
    /**
     * Get the sheet images for the period setting.
     */
    public function sheetImages()
    {
        return $this->hasMany(SheetImage::class, 'period_id'); 
    }
}
