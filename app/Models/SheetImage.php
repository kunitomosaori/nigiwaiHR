<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return $this->belongsTo(SheetPeriodSetting::class, 'period_id');
    }

    /**
     * Get the user who created the sheet image.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    /**
     * Get the sheets for the sheet image.
     */
    public function sheets()
    {
        return $this->hasMany(Sheet::class, 'sheet_image_id');
    }
}
