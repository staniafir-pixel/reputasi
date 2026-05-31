<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminModulController;
use App\Http\Controllers\Admin\AdminLessonController;
use App\Http\Controllers\Admin\AdminQuizController;
use App\Http\Controllers\Admin\AdminQuizQuestionController;
use App\Http\Controllers\Admin\AdminKosakataController;
use App\Http\Controllers\Admin\AdminArtikelController;
use App\Http\Controllers\Admin\AdminPenggunaController;
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

// ── Public ────────────────────────────────────────────────────────────────────
Route::get('/', fn() => Inertia::render('Welcome'))->name('home');

// ── User routes (auth + verified + bukan admin) ───────────────────────────────
Route::middleware(['auth', 'verified', 'user'])->group(function () {
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

// ── Admin routes (auth + admin only) ─────────────────────────────────────────
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Modul
    Route::get('/modul',                        [AdminModulController::class, 'index'])   ->name('modul.index');
    Route::get('/modul/create',                 [AdminModulController::class, 'create'])  ->name('modul.create');
    Route::post('/modul',                       [AdminModulController::class, 'store'])   ->name('modul.store');
    Route::get('/modul/{modul}/edit',           [AdminModulController::class, 'edit'])    ->name('modul.edit');
    Route::put('/modul/{modul}',                [AdminModulController::class, 'update'])  ->name('modul.update');
    Route::delete('/modul/{modul}',             [AdminModulController::class, 'destroy']) ->name('modul.destroy');

    // Lesson (nested)
    Route::get('/modul/{modul}/lessons',                [AdminLessonController::class, 'index'])   ->name('modul.lessons.index');
    Route::get('/modul/{modul}/lessons/create',         [AdminLessonController::class, 'create'])  ->name('modul.lessons.create');
    Route::post('/modul/{modul}/lessons',               [AdminLessonController::class, 'store'])   ->name('modul.lessons.store');
    Route::get('/modul/{modul}/lessons/{lesson}/edit',  [AdminLessonController::class, 'edit'])    ->name('modul.lessons.edit');
    Route::put('/modul/{modul}/lessons/{lesson}',       [AdminLessonController::class, 'update'])  ->name('modul.lessons.update');
    Route::delete('/modul/{modul}/lessons/{lesson}',    [AdminLessonController::class, 'destroy']) ->name('modul.lessons.destroy');

    // Quiz
    Route::get('/quiz',                             [AdminQuizController::class, 'index'])   ->name('quiz.index');
    Route::get('/quiz/create',                      [AdminQuizController::class, 'create'])  ->name('quiz.create');
    Route::post('/quiz',                            [AdminQuizController::class, 'store'])   ->name('quiz.store');
    Route::get('/quiz/{quiz}/edit',                 [AdminQuizController::class, 'edit'])    ->name('quiz.edit');
    Route::put('/quiz/{quiz}',                      [AdminQuizController::class, 'update'])  ->name('quiz.update');
    Route::delete('/quiz/{quiz}',                   [AdminQuizController::class, 'destroy']) ->name('quiz.destroy');

    Route::get('/quiz/{quiz}/questions',                    [AdminQuizQuestionController::class, 'index'])   ->name('quiz.questions.index');
    Route::get('/quiz/{quiz}/questions/create',             [AdminQuizQuestionController::class, 'create'])  ->name('quiz.questions.create');
    Route::post('/quiz/{quiz}/questions',                   [AdminQuizQuestionController::class, 'store'])   ->name('quiz.questions.store');
    Route::get('/quiz/{quiz}/questions/{question}/edit',    [AdminQuizQuestionController::class, 'edit'])    ->name('quiz.questions.edit');
    Route::put('/quiz/{quiz}/questions/{question}',         [AdminQuizQuestionController::class, 'update'])  ->name('quiz.questions.update');
    Route::delete('/quiz/{quiz}/questions/{question}',      [AdminQuizQuestionController::class, 'destroy']) ->name('quiz.questions.destroy');

    // Kosakata
    Route::get('/kosakata',              [AdminKosakataController::class, 'index'])   ->name('kosakata.index');
    Route::get('/kosakata/create',       [AdminKosakataController::class, 'create'])  ->name('kosakata.create');
    Route::post('/kosakata',             [AdminKosakataController::class, 'store'])   ->name('kosakata.store');
    Route::get('/kosakata/{kosakata}/edit',   [AdminKosakataController::class, 'edit'])    ->name('kosakata.edit');
    Route::put('/kosakata/{kosakata}',        [AdminKosakataController::class, 'update'])  ->name('kosakata.update');
    Route::delete('/kosakata/{kosakata}',     [AdminKosakataController::class, 'destroy']) ->name('kosakata.destroy');

    // Artikel
    Route::get('/artikel',                  [AdminArtikelController::class, 'index'])   ->name('artikel.index');
    Route::get('/artikel/create',           [AdminArtikelController::class, 'create'])  ->name('artikel.create');
    Route::post('/artikel',                 [AdminArtikelController::class, 'store'])   ->name('artikel.store');
    Route::get('/artikel/{artikel}/edit',   [AdminArtikelController::class, 'edit'])    ->name('artikel.edit');
    Route::put('/artikel/{artikel}',        [AdminArtikelController::class, 'update'])  ->name('artikel.update');
    Route::delete('/artikel/{artikel}',     [AdminArtikelController::class, 'destroy']) ->name('artikel.destroy');

    // Pengguna
    Route::get('/pengguna',                 [AdminPenggunaController::class, 'index'])   ->name('pengguna.index');
    Route::get('/pengguna/{pengguna}/edit', [AdminPenggunaController::class, 'edit'])    ->name('pengguna.edit');
    Route::put('/pengguna/{pengguna}',      [AdminPenggunaController::class, 'update'])  ->name('pengguna.update');
    Route::delete('/pengguna/{pengguna}',   [AdminPenggunaController::class, 'destroy']) ->name('pengguna.destroy');
});

require __DIR__.'/auth.php';