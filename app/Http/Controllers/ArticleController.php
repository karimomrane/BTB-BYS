<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index(Request $request)
    {
        // Get the search query and extra filter from the request
        $search = $request->query('search');
        $isExtra = $request->query('is_extra');

        // Fetch articles with pagination, search, and extra filter
        $articles = Article::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when(isset($isExtra), function ($query) use ($isExtra) {
                $query->where('is_extra', $isExtra);
            })
            ->latest('id')
            ->paginate(10) // Paginate with 10 items per page
            ->appends(request()->query()); // Preserve query parameters (e.g., search, is_extra) in pagination links

        // Return the articles to the Inertia React view
        return Inertia::render('Article/Index', [
            'articles' => $articles,
            'filters' => $request->only(['search', 'is_extra']), // Pass search and is_extra filters to the frontend
        ]);
    }
    /**
     * Show the form for creating a new article.
     */
    public function create()
    {
        // Render the create article form
        return Inertia::render('Article/Add');
    }

    /**
     * Store a newly created article in the database.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
            'is_extra' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Create the article
        Article::create($validatedData);

        // Redirect to the articles index page with a success message
        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        // Return the article to the Inertia React view
        return Inertia::render('Article/Show', [
            'article' => $article,
        ]);
    }

    /**
     * Show the form for editing the specified article.
     */
    public function edit(Article $article)
    {
        // Render the edit article form
        return Inertia::render('Article/Edit', [
            'article' => $article,
        ]);
    }

    /**
     * Update the specified article in the database.
     */
    public function update(Request $request, Article $article)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
            'is_extra' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('articles', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // Retain the old image if no new image is provided
            $validatedData['image'] = $article->image;
        }

        $article->update($validatedData);

        return redirect()->route('articles.index')->with('status', 'Article updated successfully.');
    }

    /**
     * Remove the specified article from the database.
     */
    public function destroy(Article $article)
    {
        // Delete the article's image if it exists
        if ($article->image) {
            Storage::disk('public')->delete($article->image);
        }

        // Delete the article
        $article->delete();

        // Redirect to the articles index page with a success message
        return redirect()->route('articles.index')->with('success', 'Article deleted successfully.');
    }
}
