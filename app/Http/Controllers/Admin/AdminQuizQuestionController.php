<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuizLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminQuizQuestionController extends Controller
{
    public function index(QuizLevel $quiz)
    {
        $questions = DB::table('quiz_questions')
            ->where('level_id', $quiz->id)
            ->orderBy('id')
            ->get()
            ->map(function ($q) {
                $q->options = json_decode($q->options, true) ?? [];
                return $q;
            });

        return Inertia::render('Admin/Quiz/Questions', [
            'level'     => $quiz,
            'questions' => $questions,
        ]);
    }

    public function create(QuizLevel $quiz)
    {
        return Inertia::render('Admin/Quiz/QuestionForm', [
            'level'    => $quiz,
            'question' => null,
        ]);
    }

    public function store(Request $request, QuizLevel $quiz)
    {
        $validated = $request->validate([
            'question'      => 'required|string',
            'options'       => 'required|array|size:4',
            'options.*'     => 'required|string|max:500',
            'correct_index' => 'required|integer|between:0,3',
            'type'          => 'required|in:vocab,module',
        ]);

        DB::table('quiz_questions')->insert([
            'level_id'      => $quiz->id,
            'question'      => $validated['question'],
            'options'       => json_encode($validated['options']),
            'correct_index' => $validated['correct_index'],
            'type'          => $validated['type'],
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        return redirect()->route('admin.quiz.questions.index', $quiz->id)
            ->with('success', 'Soal berhasil ditambahkan.');
    }

    public function edit(QuizLevel $quiz, $question)
    {
        $q = DB::table('quiz_questions')
            ->where('id', $question)
            ->where('level_id', $quiz->id)
            ->firstOrFail();

        $q->options = json_decode($q->options, true) ?? [];

        return Inertia::render('Admin/Quiz/QuestionForm', [
            'level'    => $quiz,
            'question' => $q,
        ]);
    }

    public function update(Request $request, QuizLevel $quiz, $question)
    {
        $validated = $request->validate([
            'question'      => 'required|string',
            'options'       => 'required|array|size:4',
            'options.*'     => 'required|string|max:500',
            'correct_index' => 'required|integer|between:0,3',
            'type'          => 'required|in:vocab,module',
        ]);

        DB::table('quiz_questions')
            ->where('id', $question)
            ->where('level_id', $quiz->id)
            ->update([
                'question'      => $validated['question'],
                'options'       => json_encode($validated['options']),
                'correct_index' => $validated['correct_index'],
                'type'          => $validated['type'],
                'updated_at'    => now(),
            ]);

        return redirect()->route('admin.quiz.questions.index', $quiz->id)
            ->with('success', 'Soal berhasil diperbarui.');
    }

    public function destroy(QuizLevel $quiz, $question)
    {
        DB::table('quiz_questions')
            ->where('id', $question)
            ->where('level_id', $quiz->id)
            ->delete();

        return redirect()->route('admin.quiz.questions.index', $quiz->id)
            ->with('success', 'Soal berhasil dihapus.');
    }
}
