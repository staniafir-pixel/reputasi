<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuizLevel;
use App\Models\UserQuizResult;
use App\Models\UserStreak;
use Illuminate\Http\Request;

class QuizApiController extends Controller
{
    public function levels(Request $request)
    {
        $user = $request->user();
        $levels = QuizLevel::withCount('questions')->get();
        $passed = UserQuizResult::where('user_id', $user->id)->where('passed', true)->pluck('level_id');

        return response()->json(['levels' => $levels, 'passed_levels' => $passed]);
    }

    public function show($id)
    {
        $level = QuizLevel::with('questions')->findOrFail($id);
        $questions = $level->questions->map(fn($q) => [
            'id' => $q->id,
            'question' => $q->question,
            'options' => $q->options,
        ]);

        return response()->json(['level' => $level, 'questions' => $questions]);
    }

    public function submit(Request $request, $id)
    {
        $request->validate(['answers' => 'required|array']);
        $level = QuizLevel::with('questions')->findOrFail($id);
        $correct = 0;

        foreach ($level->questions as $q) {
            if (isset($request->answers[$q->id]) && $request->answers[$q->id] == $q->correct_index) {
                $correct++;
            }
        }

        $total = $level->questions->count();
        $score = $total > 0 ? round(($correct / $total) * 100) : 0;
        $passed = $score >= $level->passing_score;

        UserQuizResult::create([
            'user_id' => $request->user()->id,
            'level_id' => $level->id,
            'score' => $score,
            'passed' => $passed,
            'played_at' => now(),
        ]);

        if ($passed) {
            UserStreak::firstOrCreate(
                ['user_id' => $request->user()->id, 'streak_date' => today()],
                ['activity_type' => 'quiz']
            );
        }

        return response()->json(['score' => $score, 'passed' => $passed, 'correct' => $correct, 'total' => $total]);
    }
}