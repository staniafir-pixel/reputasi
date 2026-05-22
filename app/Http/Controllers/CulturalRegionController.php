<?php

namespace App\Http\Controllers;

use App\Models\CulturalRegion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CulturalRegionController extends Controller
{
    public function index()
    {
        return Inertia::render('Map/Index', [
            'regions' => CulturalRegion::all(),
        ]);
    }

    public function create() { return Inertia::render('Admin/Region/Create'); }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'island' => 'required|string',
            'svg_region_id' => 'required|string',
            'description' => 'required|string',
        ]);

        CulturalRegion::create($request->all());
        return redirect()->route('map.index');
    }

    public function edit(CulturalRegion $peta) { return Inertia::render('Admin/Region/Edit', ['region' => $peta]); }

    public function update(Request $request, CulturalRegion $peta)
    {
        $peta->update($request->all());
        return redirect()->route('map.index');
    }

    public function destroy(CulturalRegion $peta)
    {
        $peta->delete();
        return redirect()->route('map.index');
    }
}