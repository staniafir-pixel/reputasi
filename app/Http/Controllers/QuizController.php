<?php

namespace App\Http\Controllers;

use App\Models\QuizLevel;
use App\Models\UserQuizResult;
use App\Models\UserStreak;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $levels = QuizLevel::withCount('questions')->get();
        $results = UserQuizResult::where('user_id', $user->id)
            ->where('passed', true)
            ->distinct()
            ->pluck('level_id')
            ->toArray();

        return Inertia::render('Quiz/Index', [
            'levels' => $levels,
            'passedLevels' => $results,
        ]);
    }

    public function show(QuizLevel $level)
    {
        $user = Auth::user();

        // Cek apakah level sebelumnya sudah lulus
        if ($level->level_number > 1) {
            $prevPassed = UserQuizResult::where('user_id', $user->id)
                ->whereHas('level', fn($q) => $q->where('level_number', $level->level_number - 1))
                ->where('passed', true)->exists();

            if (!$prevPassed) {
                return redirect()->route('quiz.index')->with('error', 'Selesaikan level sebelumnya dulu!');
            }
        }

        return Inertia::render('Quiz/Play', [
            'level' => $level,
            'questions' => $level->questions->map(fn($q) => [
                'id' => $q->id,
                'question' => $q->question,
                'options' => $q->options,
            ]),
        ]);
    }

    public function submit(Request $request, QuizLevel $level)
    {
        $request->validate(['answers' => 'required|array']);

        $questions = $level->questions;
        $correct = 0;

        foreach ($questions as $question) {
            if (isset($request->answers[$question->id]) &&
                $request->answers[$question->id] == $question->correct_index) {
                $correct++;
            }
        }

        $score = $questions->count() > 0 ? round(($correct / $questions->count()) * 100) : 0;
        $passed = $score >= $level->passing_score;

        UserQuizResult::create([
            'user_id' => Auth::id(),
            'level_id' => $level->id,
            'score' => $score,
            'passed' => $passed,
            'played_at' => now(),
        ]);

        if ($passed) {
            $user = Auth::user();
            UserStreak::firstOrCreate([
                'user_id' => $user->id,
                'streak_date' => today(),
            ], ['activity_type' => 'quiz']);
        }

        return back()->with([
            'score' => $score,
            'passed' => $passed,
            'correct' => $correct,
            'total' => $questions->count(),
        ]);
    }
}