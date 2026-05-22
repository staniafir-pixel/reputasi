<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $modules = Module::withCount('lessons')->get();

        $completedCounts = $user->progress()
            ->where('completed', true)
            ->selectRaw('module_id, count(*) as count')
            ->groupBy('module_id')
            ->pluck('count', 'module_id');

        return Inertia::render('Module/Index', [
            'modules' => $modules,
            'completedCounts' => $completedCounts,
        ]);
    }

    public function show(Module $module)
    {
        $user = Auth::user();

        $completedLessons = $user->progress()
            ->where('module_id', $module->id)
            ->where('completed', true)
            ->pluck('lesson_id')
            ->toArray();

        return Inertia::render('Module/Show', [
            'module' => $module->load('lessons'),
            'completedLessons' => $completedLessons,
        ]);
    }

    public function create() { return Inertia::render('Admin/Module/Create'); }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|in:aksara,cerita,musik_tari',
        ]);

        Module::create($request->all());
        return redirect()->route('module.index')->with('success', 'Modul berhasil dibuat.');
    }

    public function edit(Module $modul) { return Inertia::render('Admin/Module/Edit', ['module' => $modul]); }

    public function update(Request $request, Module $modul)
    {
        $modul->update($request->only(['title', 'description', 'type', 'order_index']));
        return redirect()->route('module.index');
    }

    public function destroy(Module $modul)
    {
        $modul->delete();
        return redirect()->route('module.index');
    }
}