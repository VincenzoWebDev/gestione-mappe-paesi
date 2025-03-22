<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    protected $fillable = ['name', 'description', 'lat', 'lng', 'map_id'];

    public function map()
    {
        return $this->belongsTo(Map::class);
    }
}
