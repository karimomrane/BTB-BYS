<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paniers = Panier::with('articles')->get();
        return Inertia::render('Panier/Index', [
            'paniers' => $paniers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Panier/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('paniers', 'public');
            $validatedData['image'] = $imagePath;
        }

        Panier::create($validatedData);

        return redirect()->route('paniers.index')->with('success', 'Panier créé avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Panier $panier)
    {
        return Inertia::render('Panier/Show', [
            'panier' => $panier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Panier $panier)
    {
        return Inertia::render('Panier/Edit', [
            'panier' => $panier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Panier $panier)
    {

        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($panier->image) {
                Storage::disk('public')->delete($panier->image);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('paniers', 'public');
            $validatedData['image'] = $imagePath;
        } else {
            // Retain the old image if no new image is provided
            $validatedData['image'] = $panier->image;
        }

        $panier->update($validatedData);

        return redirect()->route('paniers.index')->with('success', 'Panier mis à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Panier $panier)
    {
        // Delete the image if it exists
        if ($panier->image) {
            Storage::disk('public')->delete($panier->image);
        }

        $panier->delete();

        return redirect()->route('paniers.index')->with('success', 'Panier supprimé avec succès!');
    }
}
