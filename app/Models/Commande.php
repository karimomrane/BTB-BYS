<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'nbpanier',
        'date',
        'status',
        'description',
        'user_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
