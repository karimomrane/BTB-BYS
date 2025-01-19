<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Panier;
use App\Models\Panier_Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->role == 'admin') {
            $commandes = Commande::with('user')->get();
        }else {
            $commandes = Commande::with('user')->where('user_id', Auth::user()->id)->get();
        }
        $panierCommandes = Panier_Commande::with(['panier','panier.articles', 'commande'])->get();
        // Pass the commandes data to the Inertia view
        return Inertia::render('Commande/Index', [
            'commandes' => $commandes,
            'panierCommandes' => $panierCommandes,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paniers = Panier::with('articles')->get();
        return Inertia::render('Commande/Add', [
            'status' => session('status'),
            'paniers' => $paniers
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

        return to_route('commandes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        // Detach all associated paniers from the commande
        $commande->paniers()->detach();

        // Delete the specified Commande
        $commande->delete();

        // Redirect the user to the Commandes index page with a success message
        return redirect()->route('commandes.index')->with('status', 'Commande supprimée avec succès!');
    }
}
