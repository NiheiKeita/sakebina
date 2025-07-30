<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\TopController;
use App\Http\Controllers\Web\LandingPageController;

// ランディングページ
Route::get('/', [LandingPageController::class, 'index'])->name('landing');

// さけびなトップページ
Route::get('/top', [TopController::class, 'index'])->name('top');
