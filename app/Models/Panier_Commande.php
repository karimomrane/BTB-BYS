<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier_Commande extends Model
{
    protected $table = 'panier_commandes';

    protected $fillable = [
        'panier_id',
        'commande_id',
        'quantity'
    ];


    public function panier(){
        return $this->belongsTo(Panier::class);
    }
    public function commande(){
        return $this->belongsTo(Commande::class);
    }
}
