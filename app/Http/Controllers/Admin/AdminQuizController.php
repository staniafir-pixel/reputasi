<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuizLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminQuizController extends Controller
{
    public function index()
    {
        $levels = QuizLevel::orderBy('level_number')
            ->get()
            ->map(function ($level) {
                $level->questions_count = DB::table('quiz_questions')
                    ->where('level_id', $level->id)
                    ->count();
                return $level;
            });

        return Inertia::render('Admin/Quiz/Index', [
            'levels' => $levels,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Quiz/Form', [
            'level' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'level_number' => 'required|integer|min:1|unique:quiz_levels,level_number',
            'title'        => 'required|string|max:255',
            'passing_score'=> 'required|integer|min:0|max:100',
        ]);

        QuizLevel::create($validated);

        return redirect()->route('admin.quiz.index')
            ->with('success', 'Level quiz berhasil ditambahkan.');
    }

    public function edit(QuizLevel $quiz)
    {
        return Inertia::render('Admin/Quiz/Form', [
            'level' => $quiz,
        ]);
    }

    public function update(Request $request, QuizLevel $quiz)
    {
        $validated = $request->validate([
            'level_number' => 'required|integer|min:1|unique:quiz_levels,level_number,' . $quiz->id,
            'title'        => 'required|string|max:255',
            'passing_score'=> 'required|integer|min:0|max:100',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.quiz.index')
            ->with('success', 'Level quiz berhasil diperbarui.');
    }

    public function destroy(QuizLevel $quiz)
    {
        $quiz->delete();

        return redirect()->route('admin.quiz.index')
            ->with('success', 'Level quiz berhasil dihapus.');
    }
}
