<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['title', 'description', 'type', 'order_index', 'cover_image'];
    public function lessons() { return $this->hasMany(ModuleLesson::class)->orderBy('order_index'); }
    public function userProgress() { return $this->hasMany(UserProgress::class); }
}
