<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Panier;
use App\Models\Article_Panier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticlePanierController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paniers = Panier::all(); // Fetch all paniers
        $articles = Article::all(); // Fetch all articles

        return Inertia::render('ArticlePaniers/Create', [
            'paniers' => $paniers,
            'articles' => $articles,
        ]);
    }

    /**
     * Store multiple articles in a panier.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'panier_id' => 'required|exists:paniers,id',
            'articles' => 'required|array',
            'articles.*.id' => 'required|exists:articles,id',
            'articles.*.ready' => 'nullable|boolean',
            'articles.*.extra' => 'nullable|boolean',
            'articles.*.quantity' => 'nullable|integer|min:1', // Validate quantity
        ]);

        // Loop through the selected articles and associate them with the panier
        foreach ($validatedData['articles'] as $articleData) {
            // Check if the combination of panier_id and article_id already exists
            $existingRecord = Article_Panier::where('panier_id', $validatedData['panier_id'])
                ->where('article_id', $articleData['id'])
                ->first();

            if ($existingRecord) {
                return redirect()->back()->withErrors(['articles' => 'Article est déjà associé à ce panier.']);
            }

            // Create a new record if the combination doesn't exist
            Article_Panier::create([
                'panier_id' => $validatedData['panier_id'],
                'article_id' => $articleData['id'],
                'ready' => $articleData['ready'] ?? false,
                'extra' => $articleData['extra'] ?? false,
                'quantity' => $articleData['quantity'] ?? 1,
            ]);
        }

        return redirect()->route('paniers.index')->with('success', 'Articles ajoutés au panier avec succès!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Panier $panier, Article $article)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'extra' => 'nullable|boolean',
            'ready' => 'nullable|boolean',
        ]);

        // Find the pivot record for the given panier and article
        $pivotRecord = Article_Panier::where('panier_id', $panier->id)
            ->where('article_id', $article->id)
            ->firstOrFail();

        // Update the pivot record
        $pivotRecord->update($validatedData);

        return redirect()->back()->with(['success', 'Article mis à jour avec succès!'], compact('pivotRecord'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panier $panier, Article $article)
    {
        // Delete the article from the panier
        $panier->articles()->detach($article->id);

        return redirect()->back()->with('success', 'Article supprimé du panier avec succès!');
    }
}
