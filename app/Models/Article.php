<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model
{

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'is_extra',
    ];

    public function paniers(): BelongsToMany
    {
        return $this->belongsToMany(Panier::class, 'article_paniers')
            ->withPivot('ready', 'extra');
    }
}
