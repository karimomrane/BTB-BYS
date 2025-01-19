<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article_Panier extends Model
{
    protected $table = 'article_paniers';

    protected $fillable = [
        'panier_id',
        'article_id',
        'ready',
        'extra',
        'quantity'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class);
    }
}
