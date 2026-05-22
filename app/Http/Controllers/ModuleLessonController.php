<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\ModuleLesson;
use App\Models\UserProgress;
use App\Models\UserStreak;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ModuleLessonController extends Controller
{
    public function show(Module $module, ModuleLesson $lesson)
    {
        $user = Auth::user();
        $progress = UserProgress::firstOrCreate(
            ['user_id' => $user->id, 'module_id' => $module->id],
            ['lesson_id' => $lesson->id]
        );

        $allLessons = $module->lessons;
        $currentIndex = $allLessons->search(fn($l) => $l->id === $lesson->id);

        return Inertia::render('Module/Lesson', [
            'module' => $module,
            'lesson' => $lesson,
            'progress' => $progress,
            'prevLesson' => $currentIndex > 0 ? $allLessons[$currentIndex - 1] : null,
            'nextLesson' => $currentIndex < $allLessons->count() - 1 ? $allLessons[$currentIndex + 1] : null,
        ]);
    }

    public function complete(Request $request, Module $module, ModuleLesson $lesson)
    {
        $user = Auth::user();

        $allLessons = $module->lessons;
        $isLast = $allLessons->last()->id === $lesson->id;

        UserProgress::updateOrCreate(
            ['user_id' => $user->id, 'module_id' => $module->id],
            [
                'lesson_id' => $lesson->id,
                'completed' => $isLast,
                'completed_at' => $isLast ? now() : null,
            ]
        );

        // Update streak
        UserStreak::firstOrCreate([
            'user_id' => $user->id,
            'streak_date' => today(),
        ], ['activity_type' => 'module']);

        $this->updateStreakCount($user);

        if ($isLast) {
            return back()->with('success', 'Modul selesai!');
        }

        $nextLesson = $allLessons->where('order_index', '>', $lesson->order_index)->first();
        return redirect()->route('lesson.show', [$module, $nextLesson]);
    }

    private function updateStreakCount($user)
    {
        $streak = 0;
        $date = today();

        while (UserStreak::where('user_id', $user->id)->where('streak_date', $date)->exists()) {
            $streak++;
            $date = $date->subDay();
        }

        $user->update(['streak_count' => $streak, 'last_active_at' => now()]);
    }
}