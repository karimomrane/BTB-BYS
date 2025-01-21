<?php

namespace App\Http\Controllers;

use App\Models\Articles_Commande;
use App\Models\Article;
use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticlesCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articlesCommandes = Articles_Commande::with(['article', 'commande'])->get();
        return Inertia::render('ArticlesCommande/Index', [
            'articlesCommandes' => $articlesCommandes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articles = Article::all();
        $commandes = Commande::all();
        return Inertia::render('ArticlesCommande/Create', [
            'articles' => $articles,
            'commandes' => $commandes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
            'commande_id' => 'required|exists:commandes,id',
            'quantity' => 'required|integer|min:1',
            'ready' => 'boolean',
        ]);

        Articles_Commande::create($request->all());

        return redirect()->route('articles-commande.index')->with('success', 'Article Commande created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Articles_Commande $articlesCommande)
    {
        return Inertia::render('ArticlesCommande/Show', [
            'articlesCommande' => $articlesCommande->load(['article', 'commande']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Articles_Commande $articlesCommande)
    {
        $articles = Article::all();
        $commandes = Commande::all();
        return Inertia::render('ArticlesCommande/Edit', [
            'articlesCommande' => $articlesCommande,
            'articles' => $articles,
            'commandes' => $commandes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Articles_Commande $articlesCommande)
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
            'commande_id' => 'required|exists:commandes,id',
            'quantity' => 'required|integer|min:1',
            'ready' => 'boolean',
        ]);

        $articlesCommande->update($request->all());

        return redirect()->route('articles-commande.index')->with('success', 'Article Commande updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Articles_Commande $articlesCommande)
    {
        $articlesCommande->delete();
        return redirect()->route('articles-commande.index')->with('success', 'Article Commande deleted successfully.');
    }
}
