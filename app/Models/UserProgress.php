<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    protected $fillable = ['user_id', 'module_id', 'lesson_id', 'completed', 'completed_at'];
    protected $casts = ['completed' => 'boolean', 'completed_at' => 'datetime'];
    public function user() { return $this->belongsTo(User::class); }
    public function module() { return $this->belongsTo(Module::class); }
    public function lesson() { return $this->belongsTo(ModuleLesson::class, 'lesson_id'); }
}
