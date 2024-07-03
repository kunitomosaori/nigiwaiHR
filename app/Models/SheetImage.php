<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SheetImage extends Model
{
    use HasFactory;

    protected $table = 'sheet_images';

    protected $fillable = [
        'title',
        'created_by_id',
        'period_id',
    ];

    /**
     * Get the period setting that owns the sheet image.
     */
    public function periodSetting()
    {
        return $this->belongsTo(SheetPeriodSetting::class, 'period_id')->select('id', 'name');
    }

    /**
     * Get the user who created the sheet image.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class)->select('id', 'name');
    }

    /**
     * Get the sheets for the sheet image.
     */
    public function sheets()
    {
        $sheets = $this->hasMany(Sheet::class, 'sheetImage_id');
        Log::info('Sheets: ', ['sheets' => $sheets]);
        return $sheets;
    }
}
