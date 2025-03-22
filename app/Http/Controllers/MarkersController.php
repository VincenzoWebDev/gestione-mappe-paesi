<?php

namespace App\Http\Controllers;

use App\Models\Marker;
use Illuminate\Http\Request;

class MarkersController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        $marker = new Marker();
        $marker->name = $request->name;
        $marker->description = $request->description;
        $marker->lat = $request->lat;
        $marker->lng = $request->lng;
        $marker->map_id = $request->map_id;
        $marker->save();
    }

    public function update(Request $request, Marker $marker)
    {
        $request->validate([
            'name' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        $marker->name = $request->name;
        $marker->description = $request->description;
        $marker->lat = $request->lat;
        $marker->lng = $request->lng;
        $marker->save();
    }

    public function destroy(Marker $marker)
    {
        $marker->delete();
    }
}
