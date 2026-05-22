<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileApiController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'streak_count' => $user->streak_count,
            'progress' => $user->progress()->with('module')->get(),
            'quiz_results' => $user->quizResults()->with('level')->latest('played_at')->take(10)->get(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->user()->id,
        ]);

        $request->user()->update($request->only('name', 'email'));
        return response()->json(['message' => 'Profil berhasil diupdate.', 'user' => $request->user()]);
    }
}