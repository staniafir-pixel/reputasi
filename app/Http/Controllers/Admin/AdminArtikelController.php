<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminArtikelController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author')
            ->orderBy('created_at', 'desc');

        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->status === 'published') {
            $query->whereNotNull('published_at');
        } elseif ($request->status === 'draft') {
            $query->whereNull('published_at');
        }

        $articles = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Artikel/Index', [
            'articles' => $articles,
            'filters'  => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $users = DB::table('users')->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Artikel/Form', [
            'article' => null,
            'users'   => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'thumbnail'    => 'nullable|string|max:500',
            'tags'         => 'nullable|array',
            'tags.*'       => 'string|max:100',
            'published_at' => 'nullable|date',
        ]);

        Article::create([
            'author_id'    => Auth::id(),
            'title'        => $validated['title'],
            'content'      => $validated['content'],
            'thumbnail'    => $validated['thumbnail'] ?? null,
            'tags'         => $validated['tags'] ?? [],
            'published_at' => $validated['published_at'] ?? null,
        ]);

        return redirect()->route('admin.artikel.index')
            ->with('success', 'Artikel berhasil ditambahkan.');
    }

    public function edit(Article $artikel)
    {
        $users = DB::table('users')->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Artikel/Form', [
            'article' => $artikel,
            'users'   => $users,
        ]);
    }

    public function update(Request $request, Article $artikel)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'content'      => 'required|string',
            'thumbnail'    => 'nullable|string|max:500',
            'tags'         => 'nullable|array',
            'tags.*'       => 'string|max:100',
            'published_at' => 'nullable|date',
        ]);

        $artikel->update([
            'title'        => $validated['title'],
            'content'      => $validated['content'],
            'thumbnail'    => $validated['thumbnail'] ?? null,
            'tags'         => $validated['tags'] ?? [],
            'published_at' => $validated['published_at'] ?? null,
        ]);

        return redirect()->route('admin.artikel.index')
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $artikel)
    {
        $artikel->delete();

        return redirect()->route('admin.artikel.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }
}