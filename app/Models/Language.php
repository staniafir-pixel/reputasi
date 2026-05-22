<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = ['name', 'region', 'flag_icon'];
    public function vocabulary() { return $this->hasMany(Vocabulary::class); }
}
