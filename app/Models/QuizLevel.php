<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizLevel extends Model
{
    protected $fillable = ['level_number', 'title', 'passing_score'];
    public function questions() { return $this->hasMany(QuizQuestion::class, 'level_id'); }
    public function results() { return $this->hasMany(UserQuizResult::class, 'level_id'); }
}
