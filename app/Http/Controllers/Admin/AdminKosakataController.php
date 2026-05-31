<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vocabulary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminKosakataController extends Controller
{
    public function index(Request $request)
    {
        $query = Vocabulary::with('language')
            ->orderBy('word');

        if ($request->search) {
            $query->where('word', 'like', '%' . $request->search . '%')
                  ->orWhere('meaning', 'like', '%' . $request->search . '%');
        }

        if ($request->language_id) {
            $query->where('language_id', $request->language_id);
        }

        if ($request->category) {
            $query->where('category', $request->category);
        }

        $vocabularies = $query->paginate(20)->withQueryString();
        $languages    = DB::table('languages')->orderBy('name')->get(['id', 'name', 'region']);
        $categories   = Vocabulary::whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('Admin/Kosakata/Index', [
            'vocabularies' => $vocabularies,
            'languages'    => $languages,
            'categories'   => $categories,
            'filters'      => $request->only(['search', 'language_id', 'category']),
        ]);
    }

    public function create()
    {
        $languages = DB::table('languages')->orderBy('name')->get(['id', 'name', 'region']);

        return Inertia::render('Admin/Kosakata/Form', [
            'vocabulary' => null,
            'languages'  => $languages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'language_id'       => 'required|exists:languages,id',
            'word'              => 'required|string|max:255',
            'meaning'           => 'required|string',
            'pronunciation'     => 'nullable|string|max:255',
            'example_sentence'  => 'nullable|string',
            'category'          => 'nullable|string|max:255',
        ]);

        Vocabulary::create($validated);

        return redirect()->route('admin.kosakata.index')
            ->with('success', 'Kosakata berhasil ditambahkan.');
    }

    public function edit(Vocabulary $kosakata)
    {
        $languages = DB::table('languages')->orderBy('name')->get(['id', 'name', 'region']);

        return Inertia::render('Admin/Kosakata/Form', [
            'vocabulary' => $kosakata,
            'languages'  => $languages,
        ]);
    }

    public function update(Request $request, Vocabulary $kosakata)
    {
        $validated = $request->validate([
            'language_id'       => 'required|exists:languages,id',
            'word'              => 'required|string|max:255',
            'meaning'           => 'required|string',
            'pronunciation'     => 'nullable|string|max:255',
            'example_sentence'  => 'nullable|string',
            'category'          => 'nullable|string|max:255',
        ]);

        $kosakata->update($validated);

        return redirect()->route('admin.kosakata.index')
            ->with('success', 'Kosakata berhasil diperbarui.');
    }

    public function destroy(Vocabulary $kosakata)
    {
        $kosakata->delete();

        return redirect()->route('admin.kosakata.index')
            ->with('success', 'Kosakata berhasil dihapus.');
    }
}
