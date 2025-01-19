<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Panier extends Model
{

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
    ];

    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_paniers')
            ->withPivot('ready', 'extra','quantity');
    }
    public function commandes(): BelongsToMany
    {
        return $this->belongsToMany(Commande::class, 'panier_commandes')
            ->withPivot('quantity'); // Include quantity in the pivot table
    }
}
