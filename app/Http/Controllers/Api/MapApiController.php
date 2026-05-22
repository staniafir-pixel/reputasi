<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CulturalRegion;

class MapApiController extends Controller
{
    public function index()
    {
        return response()->json(CulturalRegion::all());
    }
}