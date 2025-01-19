<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Commande extends Model
{
    protected $fillable = [
        'date',
        'status',
        'description',
        'user_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function paniers(): BelongsToMany
    {
        return $this->belongsToMany(Panier::class, 'panier_commandes')
            ->withPivot('quantity'); // Include quantity in the pivot table
    }
}
