<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleLesson extends Model
{
    protected $fillable = ['module_id', 'title', 'content', 'image_url', 'order_index'];
    public function module() { return $this->belongsTo(Module::class); }
}
