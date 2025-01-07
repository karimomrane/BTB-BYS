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
            return Inertia::render('Dashboard', [
                'commandes' => $commandes,
                'users' => $users
            ]);
        }else {
            $commandes = Commande::where('user_id', Auth::user()->id)->count();
            return Inertia::render('Dashboard', [
                'commandes' => $commandes
            ]);
        }
    }
}
