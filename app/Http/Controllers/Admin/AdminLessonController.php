<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminLessonController extends Controller
{
    public function index(Module $modul)
    {
        $lessons = DB::table('module_lessons')
            ->where('module_id', $modul->id)
            ->orderBy('order_index')
            ->get();

        return Inertia::render('Admin/Modul/Lessons', [
            'module'  => $modul,
            'lessons' => $lessons,
        ]);
    }

    public function create(Module $modul)
    {
        return Inertia::render('Admin/Modul/LessonForm', [
            'module' => $modul,
            'lesson' => null,
        ]);
    }

    public function store(Request $request, Module $modul)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'content'     => 'required|string',
            'image_url'   => 'nullable|string|max:500',
            'order_index' => 'required|integer|min:0',
        ]);

        DB::table('module_lessons')->insert([
            'module_id'   => $modul->id,
            'title'       => $validated['title'],
            'content'     => $validated['content'],
            'image_url'   => $validated['image_url'] ?? null,
            'order_index' => $validated['order_index'],
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);

        return redirect()->route('admin.modul.lessons.index', $modul->id)
            ->with('success', 'Pelajaran berhasil ditambahkan.');
    }

    public function edit(Module $modul, $lesson)
    {
        $lessonData = DB::table('module_lessons')
            ->where('id', $lesson)
            ->where('module_id', $modul->id)
            ->firstOrFail();

        return Inertia::render('Admin/Modul/LessonForm', [
            'module' => $modul,
            'lesson' => $lessonData,
        ]);
    }

    public function update(Request $request, Module $modul, $lesson)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'content'     => 'required|string',
            'image_url'   => 'nullable|string|max:500',
            'order_index' => 'required|integer|min:0',
        ]);

        DB::table('module_lessons')
            ->where('id', $lesson)
            ->where('module_id', $modul->id)
            ->update([
                'title'       => $validated['title'],
                'content'     => $validated['content'],
                'image_url'   => $validated['image_url'] ?? null,
                'order_index' => $validated['order_index'],
                'updated_at'  => now(),
            ]);

        return redirect()->route('admin.modul.lessons.index', $modul->id)
            ->with('success', 'Pelajaran berhasil diperbarui.');
    }

    public function destroy(Module $modul, $lesson)
    {
        DB::table('module_lessons')
            ->where('id', $lesson)
            ->where('module_id', $modul->id)
            ->delete();

        return redirect()->route('admin.modul.lessons.index', $modul->id)
            ->with('success', 'Pelajaran berhasil dihapus.');
    }
}