<?php

namespace App\Http\Controllers;

use App\Models\Vocabulary;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VocabularyController extends Controller
{
    public function index(Request $request)
{
    $query = Vocabulary::with('language');

    if ($request->search) {
        $query->where('word', 'like', "%{$request->search}%")
              ->orWhere('meaning', 'like', "%{$request->search}%");
    }

    if ($request->language) {
        $query->whereHas('language', fn($q) => $q->where('name', $request->language));
    }

    return Inertia::render('Vocabulary/Index', [
        'vocabularies' => $query->paginate(20)->withQueryString(),
        'languages' => Language::pluck('name'),
        'filters' => $request->only(['search', 'language']),
    ]);
}

    public function show(Vocabulary $vocabulary)
    {
        return Inertia::render('Vocabulary/Show', [
            'word' => $vocabulary->load('language'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Vocabulary/Create', [
            'languages' => Language::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'language_id' => 'required|exists:languages,id',
            'word' => 'required|string',
            'meaning' => 'required|string',
            'pronunciation' => 'nullable|string',
            'example_sentence' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        Vocabulary::create($request->all());
        return redirect()->route('admin.kosakata.index')->with('success', 'Kosakata berhasil ditambahkan.');
    }

    public function edit(Vocabulary $kosakata)
    {
        return Inertia::render('Admin/Vocabulary/Edit', [
            'word' => $kosakata->load('language'),
            'languages' => Language::all(),
        ]);
    }

    public function update(Request $request, Vocabulary $kosakata)
    {
        $request->validate([
            'language_id' => 'required|exists:languages,id',
            'word' => 'required|string',
            'meaning' => 'required|string',
        ]);

        $kosakata->update($request->all());
        return redirect()->route('admin.kosakata.index')->with('success', 'Kosakata berhasil diupdate.');
    }

    public function destroy(Vocabulary $kosakata)
    {
        $kosakata->delete();
        return redirect()->route('admin.kosakata.index')->with('success', 'Kosakata berhasil dihapus.');
    }
}