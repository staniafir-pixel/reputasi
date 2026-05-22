<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\ModuleLesson;
use App\Models\UserProgress;
use App\Models\UserStreak;
use Illuminate\Http\Request;

class ModuleApiController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $modules = Module::withCount('lessons')->get();
        $progress = $user->progress()->get()->keyBy('module_id');

        return response()->json([
            'modules' => $modules,
            'progress' => $progress,
        ]);
    }

    public function show($id)
    {
        $module = Module::with('lessons')->findOrFail($id);
        return response()->json($module);
    }

    public function lesson($moduleId, $lessonId)
    {
        $module = Module::findOrFail($moduleId);
        $lesson = ModuleLesson::findOrFail($lessonId);
        $allLessons = $module->lessons;
        $currentIndex = $allLessons->search(fn($l) => $l->id === $lesson->id);

        return response()->json([
            'module' => $module,
            'lesson' => $lesson,
            'prev_lesson' => $currentIndex > 0 ? $allLessons[$currentIndex - 1] : null,
            'next_lesson' => $currentIndex < $allLessons->count() - 1 ? $allLessons[$currentIndex + 1] : null,
        ]);
    }

    public function complete(Request $request, $moduleId, $lessonId)
    {
        $user = $request->user();
        $module = Module::findOrFail($moduleId);
        $lesson = ModuleLesson::findOrFail($lessonId);
        $isLast = $module->lessons->last()->id === $lesson->id;

        UserProgress::updateOrCreate(
            ['user_id' => $user->id, 'module_id' => $module->id],
            ['lesson_id' => $lesson->id, 'completed' => $isLast, 'completed_at' => $isLast ? now() : null]
        );

        UserStreak::firstOrCreate(
            ['user_id' => $user->id, 'streak_date' => today()],
            ['activity_type' => 'module']
        );

        $streak = 0;
        $date = today();
        while (UserStreak::where('user_id', $user->id)->where('streak_date', $date)->exists()) {
            $streak++;
            $date = $date->subDay();
        }
        $user->update(['streak_count' => $streak, 'last_active_at' => now()]);

        return response()->json(['message' => 'Progress disimpan.', 'completed' => $isLast]);
    }
}