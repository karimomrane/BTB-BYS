<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticlePanierController;
use App\Http\Controllers\ArticlesCommandeController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanierCommandeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware('auth')->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::resources(['paniers' => PanierController::class]);
    Route::resources(['articles' => ArticleController::class]);

    // Routes for article_paniers
    Route::resource('article_paniers', ArticlePanierController::class)->only([
        'create',
        'store',
        'destroy'
    ]);
    Route::delete('/paniers/{panier}/articles/{article}', [ArticlePanierController::class, 'destroy'])
    ->name('article_paniers.destroy');
    Route::patch('/paniers/{panier}/articles/{article}', [ArticlePanierController::class, 'update'])
    ->name('article_paniers.update');

    Route::resource('articles_commande', ArticlesCommandeController::class);

    Route::resource('panier_commandes', PanierCommandeController::class);



    Route::resources(['commandes' => CommandeController::class]);
    Route::resources(['users' => UserController::class]);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
