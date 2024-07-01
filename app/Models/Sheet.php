<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sheet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'sheet_status_id',
        'title',
    ];

    /**
     * Get the user that owns the sheet.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sheet status that owns the sheet.
     */
    public function sheetStatus()
    {
        return $this->belongsTo(SheetStatus::class);
    }
}
