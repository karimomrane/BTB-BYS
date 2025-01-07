<?php

namespace App\Http\Controllers;

use App\Models\Commande;
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
        // Retrieve all commandes from the database
        $commandes = Commande::with('user')->get();

        // Pass the commandes data to the Inertia view
        return Inertia::render('Commande/Index', [
            'commandes' => $commandes,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Commande/Add', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'nbpanier' => 'required|integer|min:1',
            'date' => 'required|date',
        ]);

        // Create the new Commande
        Commande::create([
            'nbpanier' => $validated['nbpanier'],
            'date' => $validated['date'],
            'description' => $request->description,
            'user_id' => Auth::user()->id, // Store the ID of the logged-in user
        ]);

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
            'nbpanier' => 'required|integer|min:1',
            'date' => 'required|date',
            'status' => 'required',
        ]);

        // Update the Commande
        $commande->update([
            'nbpanier' => $validated['nbpanier'],
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
        // Delete the specified Commande
        $commande->delete();

        // Redirect the user to the Commandes index page with a success message
        return redirect()->route('commandes.index')->with('status', 'Commande supprimée avec succès!');
    }
}
