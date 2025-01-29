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
        if (Auth::user()->role == 'admin') {
            // General KPIs
            $commandes = Commande::count();
            $users = User::count();
            $comliv = Commande::where('status', 'Livré')->count();
            $compay = Commande::where('status', 'Payé')->count();

            // Calculate total revenue for orders with status = Payé
            $totalRevenue = Commande::where('status', 'Payé')
                ->with(['articles' => function ($query) {
                    $query->select('articles.id', 'articles.price')
                        ->withPivot('quantity');
                }, 'paniers' => function ($query) {
                    $query->select('paniers.id', 'paniers.price')
                        ->withPivot('quantity');
                }])
                ->get()
                ->sum(function ($commande) {
                    // Calculate revenue from articles
                    $articleRevenue = $commande->articles->sum(function ($article) {
                        return $article->pivot->quantity * $article->price;
                    });

                    // Calculate revenue from paniers
                    $panierRevenue = $commande->paniers->sum(function ($panier) {
                        return $panier->pivot->quantity * $panier->price;
                    });

                    // Total revenue for this order
                    return $articleRevenue + $panierRevenue;
                });
            // Calculate total revenue for orders with status = Livré
            $totalRevenuePrevu = Commande::where('status', 'Livré')
                ->with(['articles' => function ($query) {
                    $query->select('articles.id', 'articles.price')
                        ->withPivot('quantity');
                }, 'paniers' => function ($query) {
                    $query->select('paniers.id', 'paniers.price')
                        ->withPivot('quantity');
                }])
                ->get()
                ->sum(function ($commande) {
                    // Calculate revenue from articles
                    $articleRevenue = $commande->articles->sum(function ($article) {
                        return $article->pivot->quantity * $article->price;
                    });

                    // Calculate revenue from paniers
                    $panierRevenue = $commande->paniers->sum(function ($panier) {
                        return $panier->pivot->quantity * $panier->price;
                    });

                    // Total revenue for this order
                    return $articleRevenue + $panierRevenue;
                });



            // User ranking by number of orders and validated orders
            $uc = User::withCount(['commandes' => function ($query) {
                $query->whereIn('status', ['Payé', 'Livré']);
            }])
                ->where('role', '!=', 'admin')
                ->get()
                ->map(function ($user) {
                    // Calculate total revenue for the user
                    $user->total_revenue = $user->commandes()
                        ->whereIn('status', ['Payé', 'Livré'])
                        ->with(['articles' => function ($query) {
                            $query->select('articles.id', 'articles.price')
                                ->withPivot('quantity');
                        }, 'paniers' => function ($query) {
                            $query->select('paniers.id', 'paniers.price')
                                ->withPivot('quantity');
                        }])
                        ->get()
                        ->sum(function ($commande) {
                            // Calculate revenue from articles
                            $articleRevenue = $commande->articles->sum(function ($article) {
                                return $article->pivot->quantity * $article->price;
                            });

                            // Calculate revenue from paniers
                            $panierRevenue = $commande->paniers->sum(function ($panier) {
                                return $panier->pivot->quantity * $panier->price;
                            });

                            // Total revenue for this order
                            return $articleRevenue + $panierRevenue;
                        });

                    return $user;
                });

            return Inertia::render('Dashboard', [
                'commandes' => $commandes,
                'comliv' => $comliv,
                'users' => $users,
                'uc' => $uc,
                'totalRevenue' => $totalRevenue, // Pass total revenue to the frontend
                'totalRevenuePrevu' => $totalRevenuePrevu,
                'compay' => $compay
            ]);
        } else {
            return to_route('commandes.create');
        }
    }
}
