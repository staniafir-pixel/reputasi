<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = ['level_id', 'question', 'options', 'correct_index', 'type'];
    protected $casts = ['options' => 'array'];
    public function level() { return $this->belongsTo(QuizLevel::class); }
}
