<?php

namespace App\Http\Controllers;

use App\Mail\JustTesting;
use App\Models\Article;
use App\Models\Articles_Commande;
use App\Models\Commande;
use App\Models\Panier;
use App\Models\Panier_Commande;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Start with a base query
        $query = Commande::with('user');

        if ($request->has('start_date') && $request->has('end_date')) {
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');

            if ($startDate == $endDate) {
                // Filter for a single day
                $query->whereDate('created_at', $startDate);
            } else {
                // Adjust the end date to include the entire day
                $endDate = Carbon::parse($endDate)->endOfDay()->toDateTimeString();

                $query->whereBetween('created_at', [
                    $startDate,
                    $endDate
                ]);
            }
        }
        // Filter by user if not admin
        if (Auth::user()->role != 'admin') {
            $query->where('user_id', Auth::user()->id);
        }

        // Paginate the results
        $commandes = $query->latest('id')->paginate(10); // Adjust the number of items per page as needed

        // Fetch related data
        $panierCommandes = Panier_Commande::with(['panier', 'panier.articles', 'commande'])->get();
        $articleCommandes = Articles_Commande::with(['article', 'commande'])->get();

        // Pass data to the Inertia view
        return Inertia::render('Commande/Index', [
            'commandes' => $commandes,
            'panierCommandes' => $panierCommandes,
            'articleCommandes' => $articleCommandes,
            'status' => session('status'),
            'filters' => $request->only(['start_date', 'end_date']), // Pass filters to the frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paniers = Panier::with('articles')->get();
        $articles = Article::all();
        return Inertia::render('Commande/Add', [
            'status' => session('status'),
            'paniers' => $paniers,
            'articles' => $articles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'date' => 'required|date',
            'description' => 'nullable|string',
            'paniers' => 'required|array', // Ensure paniers is an array
            'paniers.*.panier_id' => 'required|exists:paniers,id', // Validate each panier_id
            'paniers.*.quantity' => 'required|integer|min:1', // Validate each quantity
            'articles_commandes' => 'nullable|array', // Ensure articles_commandes is an array (optional)
            'articles_commandes.*.article_id' => 'required|exists:articles,id', // Validate each article_id
            'articles_commandes.*.quantity' => 'required|integer|min:1', // Validate each quantity
        ]);

        // Create the new Commande
        $commande = Commande::create([
            'date' => $validated['date'],
            'description' => $validated['description'],
            'user_id' => Auth::user()->id, // Store the ID of the logged-in user
        ]);

        // Attach the selected paniers with their quantities to the commande
        foreach ($request->paniers as $panier) {
            $commande->paniers()->attach($panier['panier_id'], [
                'quantity' => $panier['quantity'], // Store the quantity in the pivot table
            ]);
        }

        // Attach the selected extra articles with their quantities to the commande
        if ($request->has('articles_commandes')) {
            foreach ($request->articles_commandes as $article) {
                $commande->articles()->attach($article['article_id'], [
                    'quantity' => $article['quantity'], // Store the quantity in the pivot table
                    'ready' => false, // Default value for 'ready'
                ]);
            }
        }

        // Redirect the user to the Commandes index page with a success message
        return redirect()->route('commandes.index')->with('status', 'Commande ajoutée avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Commande $commande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        // Retrieve the specified Commande
        $commande = Commande::findOrFail($request->route('commande'));

        // Pass the commande data to the Inertia view
        return Inertia::render('Commande/Edit', [
            'commande' => $commande,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $commande)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'date' => 'required|date',
            'status' => 'required',
        ]);

        // Update the Commande
        $commande->update([
            'date' => $validated['date'],
            'status' => $validated['status'],
            'description' => $request->description,
        ]);

        // Send Email Notification
        Mail::to($commande->user->email)->send(new JustTesting($commande));

        return to_route('commandes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        // Detach all associated paniers from the commande
        $commande->paniers()->detach();

        // Detach all associated articles from the commande
        $commande->articles()->detach();

        // Delete the specified Commande
        $commande->delete();

        // Redirect the user to the Commandes index page with a success message
        return redirect()->route('commandes.index')->with('status', 'Commande supprimée avec succès!');
    }
}
