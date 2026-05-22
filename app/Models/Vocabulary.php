<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    protected $table = 'vocabulary';
    protected $fillable = ['language_id', 'word', 'meaning', 'pronunciation', 'example_sentence', 'category'];
    public function language() { return $this->belongsTo(Language::class); }
}
