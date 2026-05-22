<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserQuizResult extends Model
{
    protected $fillable = ['user_id', 'level_id', 'score', 'passed', 'played_at'];
    protected $casts = ['passed' => 'boolean'];
    public function user() { return $this->belongsTo(User::class); }
    public function level() { return $this->belongsTo(QuizLevel::class); }
}
