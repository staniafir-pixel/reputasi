<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VocabularyApiController;
use App\Http\Controllers\Api\ArticleApiController;
use App\Http\Controllers\Api\ModuleApiController;
use App\Http\Controllers\Api\QuizApiController;
use App\Http\Controllers\Api\ProfileApiController;
use App\Http\Controllers\Api\MapApiController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Kamus
    Route::get('/vocabulary', [VocabularyApiController::class, 'index']);
    Route::get('/vocabulary/{id}', [VocabularyApiController::class, 'show']);

    // Artikel
    Route::get('/articles', [ArticleApiController::class, 'index']);
    Route::get('/articles/{id}', [ArticleApiController::class, 'show']);

    // Modul
    Route::get('/modules', [ModuleApiController::class, 'index']);
    Route::get('/modules/{id}', [ModuleApiController::class, 'show']);
    Route::get('/modules/{moduleId}/lessons/{lessonId}', [ModuleApiController::class, 'lesson']);
    Route::post('/modules/{moduleId}/lessons/{lessonId}/complete', [ModuleApiController::class, 'complete']);

    // Peta
    Route::get('/regions', [MapApiController::class, 'index']);

    // Quiz
    Route::get('/quiz/levels', [QuizApiController::class, 'levels']);
    Route::get('/quiz/levels/{id}', [QuizApiController::class, 'show']);
    Route::post('/quiz/levels/{id}/submit', [QuizApiController::class, 'submit']);

    // Profil
    Route::get('/profile', [ProfileApiController::class, 'show']);
    Route::patch('/profile', [ProfileApiController::class, 'update']);
});