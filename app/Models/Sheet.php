<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sheet extends Model
{
    use HasFactory;
    use HasUlids;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'sheet_image_id',
        'sheet_status_id',
        'sheet_company_goal_id',
        'created_by_id',
        'period_setting_id',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
    ];

    /**
     * Get the sheet image that owns the sheet.
     */
    public function sheetImage()
    {
        return $this->belongsTo(sheetImage::class);
    }

    /**
     * Get the sheet status that owns the sheet.
     */
    public function sheetStatus()
    {
        return $this->belongsTo(SheetStatus::class);
    }

    /**
     * Get the user who created the sheet.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by_id')->select('id','name');
    }
}
