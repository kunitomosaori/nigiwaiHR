<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConnectionsUserSheet extends Model
{
    use HasFactory;

    protected $table = 'connections_user_sheet';

    protected $fillable = [
        'user_id',
        'sheet_id',
        'role',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sheet()
    {
        return $this->belongsTo(Sheet::class);
    }
}
