<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Module;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Dashboard', [
            'modules' => Module::withCount('lessons')->get(),
            'latestArticles' => Article::with('author')->latest('published_at')->take(3)->get(),
            'streakCount' => $user->streak_count,
            'progress' => $user->progress()
                ->where('completed', true)
                ->selectRaw('module_id, count(*) as completed_count')
                ->groupBy('module_id')
                ->get()
                ->mapWithKeys(fn($item) => [$item->module_id => (int) $item->completed_count]),
        ]);
    }
}