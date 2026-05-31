<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminModulController extends Controller
{
    public function index()
    {
        $modules = Module::withCount('lessons')
            ->orderBy('order_index')
            ->get();

        return Inertia::render('Admin/Modul/Index', [
            'modules' => $modules,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Modul/Form', [
            'module' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'type'        => 'required|in:aksara,cerita,musik_tari',
            'order_index' => 'required|integer|min:0',
            'cover_image' => 'nullable|string|max:500',
        ]);

        Module::create($validated);

        return redirect()->route('admin.modul.index')
            ->with('success', 'Modul berhasil ditambahkan.');
    }

    public function edit(Module $modul)
    {
        return Inertia::render('Admin/Modul/Form', [
            'module' => $modul,
        ]);
    }

    public function update(Request $request, Module $modul)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'type'        => 'required|in:aksara,cerita,musik_tari',
            'order_index' => 'required|integer|min:0',
            'cover_image' => 'nullable|string|max:500',
        ]);

        $modul->update($validated);

        return redirect()->route('admin.modul.index')
            ->with('success', 'Modul berhasil diperbarui.');
    }

    public function destroy(Module $modul)
    {
        $modul->delete();

        return redirect()->route('admin.modul.index')
            ->with('success', 'Modul berhasil dihapus.');
    }
}