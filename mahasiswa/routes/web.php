<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MahasiswaController;

Route::get('/test', function () {
    return view('layouts.app');
});

Route::get('/', [MahasiswaController::class, 'index']);
Route::resource('mahasiswa', MahasiswaController::class);
