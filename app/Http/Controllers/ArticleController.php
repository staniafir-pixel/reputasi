<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author')->whereNotNull('published_at')->latest('published_at');

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->tag) {
            $query->whereJsonContains('tags', $request->tag);
        }

        return Inertia::render('Article/Index', [
            'articles' => $query->paginate(9)->withQueryString(),
            'filters' => $request->only(['search', 'tag']),
        ]);
    }

    public function show(Article $article)
    {
        return Inertia::render('Article/Show', [
            'article' => $article->load('author'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Article/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'nullable|string',
        ]);

        $tags = $request->tags
            ? array_map('trim', explode(',', $request->tags))
            : [];

        Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'tags' => $tags,
            'author_id' => Auth::id(),
            'published_at' => now(),
        ]);

        return redirect()->route('article.index')->with('success', 'Artikel berhasil dipublikasikan.');
    }

    public function edit(Article $artikel)
    {
        return Inertia::render('Admin/Article/Edit', ['article' => $artikel]);
    }

    public function update(Request $request, Article $artikel)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $artikel->update($request->only(['title', 'content', 'tags']));
        return redirect()->route('article.index')->with('success', 'Artikel berhasil diupdate.');
    }

    public function destroy(Article $artikel)
    {
        $artikel->delete();
        return redirect()->route('article.index')->with('success', 'Artikel berhasil dihapus.');
    }
}