<?php

namespace App\Http\Controllers;

use App\Models\Map;
use App\Models\Marker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MapsController extends Controller
{
    public function index()
    {
        $maps = Map::all();
        return Inertia::render('Maps/Index', [
            'maps' => $maps,
        ]);
    }

    public function create()
    {
        return Inertia::render('Maps/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'zoom' => 'required',
        ]);

        $map = new Map();
        $map->name = $request->name;
        $map->description = $request->description;
        $map->lat = $request->lat;
        $map->lng = $request->lng;
        $map->zoom = $request->zoom;
        $map->user_id = Auth::user()->id;
        $res = $map->save();

        $messaggio = $res ? 'Mappa creata correttamente' : 'Errore nella creazione della mappa';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('maps.index');
    }

    public function edit(Map $map)
    {
        $markers = $map->markers;
        return Inertia::render('Maps/Edit', [
            'centerMap' => $map,
            'markers' => $markers,
        ]);
    }

    public function update(Request $request, Map $map)
    {
        $request->validate([
            'name' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'zoom' => 'required',
        ]);
        $map->name = $request->name;
        $map->description = $request->description;
        $map->lat = $request->lat;
        $map->lng = $request->lng;
        $map->zoom = $request->zoom;
        $res = $map->save();

        $messaggio = $res ? 'Mappa aggiornata correttamente' : 'Errore nell\'aggiornamento della mappa';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('maps.index');

        // return redirect()->route('maps.index');
    }

    public function destroy(Map $map)
    {
        $map->delete();
    }
}
