<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VocabularyController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ModuleLessonController;
use App\Http\Controllers\CulturalRegionController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Welcome'))->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/kamus', [VocabularyController::class, 'index'])->name('vocabulary.index');
    Route::get('/kamus/{vocabulary}', [VocabularyController::class, 'show'])->name('vocabulary.show');
    Route::get('/artikel', [ArticleController::class, 'index'])->name('article.index');
    Route::get('/artikel/{article}', [ArticleController::class, 'show'])->name('article.show');
    Route::get('/modul', [ModuleController::class, 'index'])->name('module.index');
    Route::get('/modul/{module}', [ModuleController::class, 'show'])->name('module.show');
    Route::get('/modul/{module}/pelajaran/{lesson}', [ModuleLessonController::class, 'show'])->name('lesson.show');
    Route::post('/modul/{module}/pelajaran/{lesson}/selesai', [ModuleLessonController::class, 'complete'])->name('lesson.complete');
    Route::get('/peta', [CulturalRegionController::class, 'index'])->name('map.index');
    Route::get('/quiz', [QuizController::class, 'index'])->name('quiz.index');
    Route::get('/quiz/{level}', [QuizController::class, 'show'])->name('quiz.show');
    Route::post('/quiz/{level}/submit', [QuizController::class, 'submit'])->name('quiz.submit');
    Route::get('/profil', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('kosakata', VocabularyController::class)->except(['index', 'show']);
    Route::resource('artikel', ArticleController::class)->except(['index', 'show']);
    Route::resource('modul', ModuleController::class)->except(['index', 'show']);
    Route::resource('peta', CulturalRegionController::class)->except(['index', 'show']);
});

require __DIR__.'/auth.php';