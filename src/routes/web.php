<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\TopController;

// さけびなトップページのみ
Route::get('/', [TopController::class, 'index'])->name('top');
