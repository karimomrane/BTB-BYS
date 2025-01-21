<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Articles_Commande extends Model
{
    protected $table = 'articles_commandes';
    protected $fillable = ['article_id', 'commande_id', 'quantity', 'ready'];
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }
}
