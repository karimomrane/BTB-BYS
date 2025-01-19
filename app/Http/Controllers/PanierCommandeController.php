<?php

namespace App\Http\Controllers;

use App\Models\Panier_Commande;
use App\Models\Panier;
use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PanierCommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $panierCommandes = Panier_Commande::with(['panier', 'commande'])->get();
        return Inertia::render('PanierCommande/Index', [
            'panierCommandes' => $panierCommandes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $paniers = Panier::all();
        $commandes = Commande::all();
        return Inertia::render('PanierCommande/Create', [
            'paniers' => $paniers,
            'commandes' => $commandes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'panier_id' => 'required|exists:paniers,id',
            'commande_id' => 'required|exists:commandes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        Panier_Commande::create($request->all());

        return redirect()->route('panier_commandes.index')
            ->with('success', 'Panier_Commande created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Panier_Commande $panierCommande)
    {
        return Inertia::render('PanierCommande/Show', [
            'panierCommande' => $panierCommande->load(['panier', 'commande']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panier_Commande $panierCommande)
    {
        $paniers = Panier::all();
        $commandes = Commande::all();
        return Inertia::render('PanierCommande/Edit', [
            'panierCommande' => $panierCommande,
            'paniers' => $paniers,
            'commandes' => $commandes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Panier_Commande $panierCommande)
    {
        $request->validate([
            'panier_id' => 'required|exists:paniers,id',
            'commande_id' => 'required|exists:commandes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $panierCommande->update($request->all());

        return redirect()->route('panier_commandes.index')
            ->with('success', 'Panier_Commande updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panier_Commande $panierCommande)
    {
        $panierCommande->delete();

        return redirect()->route('panier_commandes.index')
            ->with('success', 'Panier_Commande deleted successfully.');
    }
}
