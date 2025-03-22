<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    protected $fillable = ['name', 'description', 'zoom', 'lat', 'lng', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function markers()
    {
        return $this->hasMany(Marker::class);
    }
}
