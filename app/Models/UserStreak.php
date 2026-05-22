<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStreak extends Model
{
    protected $fillable = ['user_id', 'streak_date', 'activity_type'];
    protected $casts = ['streak_date' => 'date'];
    public function user() { return $this->belongsTo(User::class); }
}
