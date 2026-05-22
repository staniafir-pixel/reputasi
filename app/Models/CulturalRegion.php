<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CulturalRegion extends Model
{
    protected $fillable = ['name', 'island', 'svg_region_id', 'description', 'highlights', 'image_url'];
    protected $casts = ['highlights' => 'array'];
}
