<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $safeCount = fn($table) => Schema::hasTable($table) ? DB::table($table)->count() : 0;

        $stats = [
            'users'          => User::count(),
            'modules'        => $safeCount('modules'),
            'lessons'        => $safeCount('module_lessons'),
            'quiz_levels'    => $safeCount('quiz_levels'),
            'quiz_questions' => $safeCount('quiz_questions'),
            'vocabularies'   => $safeCount('vocabularies'),
            'articles'       => $safeCount('articles'),
            'regions'        => $safeCount('cultural_regions'),
        ];

        $recentUsers = User::orderBy('created_at', 'desc')->limit(5)->get(['id', 'name', 'email', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats'       => $stats,
            'recentUsers' => $recentUsers,
        ]);
    }
}