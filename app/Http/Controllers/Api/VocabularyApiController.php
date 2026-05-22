<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vocabulary;
use App\Models\Language;
use Illuminate\Http\Request;

class VocabularyApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Vocabulary::with('language');

        if ($request->search) {
            $query->where('word', 'like', "%{$request->search}%")
                  ->orWhere('meaning', 'like', "%{$request->search}%");
        }

        if ($request->language_id) {
            $query->where('language_id', $request->language_id);
        }

        return response()->json([
            'data' => $query->paginate(20),
            'languages' => Language::all(),
        ]);
    }

    public function show($id)
    {
        $word = Vocabulary::with('language')->findOrFail($id);
        return response()->json($word);
    }
}