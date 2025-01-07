<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard()
    {
        if(Auth::user()->role == 'admin') {
            $commandes = Commande::count();
            $users = User::count();
            $comliv = Commande::where('status', 'Livré')->count();
            $uc = User::withCount('commandes')->where('role', '!=', 'admin')->get();
            return Inertia::render('Dashboard', [
                'commandes' => $commandes,
                'comliv' => $comliv,
                'users' => $users,
                'uc' => $uc
            ]);
        }else {
            return to_route('commandes.create');
        }
    }
}
