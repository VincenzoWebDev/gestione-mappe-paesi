<?php

use App\Http\Controllers\MapsController;
use App\Http\Controllers\MarkersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('maps', [MapsController::class, 'index'])->name('maps.index');
    Route::get('maps/create', [MapsController::class, 'create'])->name('maps.create');
    Route::post('maps', [MapsController::class, 'store'])->name('maps.store');
    Route::get('maps/{map}', [MapsController::class, 'edit'])->name('maps.edit');
    Route::patch('maps/{map}', [MapsController::class, 'update'])->name('maps.update');
    Route::delete('maps/{map}', [MapsController::class, 'destroy'])->name('maps.destroy');

    Route::post('maps/markers', [MarkersController::class, 'store'])->name('maps.markers.store');
    Route::patch('maps/markers/{marker}', [MarkersController::class, 'update'])->name('maps.markers.update');
    Route::delete('maps/markers/{marker}', [MarkersController::class, 'destroy'])->name('maps.markers.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
