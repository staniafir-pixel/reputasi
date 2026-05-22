<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleApiController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author')->whereNotNull('published_at')->latest('published_at');

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        return response()->json($query->paginate(10));
    }

    public function show($id)
    {
        $article = Article::with('author')->findOrFail($id);
        return response()->json($article);
    }
}