<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = ['author_id', 'title', 'content', 'thumbnail', 'tags', 'published_at'];
    protected $casts = ['tags' => 'array', 'published_at' => 'datetime'];
    public function author() { return $this->belongsTo(User::class, 'author_id'); }
}
