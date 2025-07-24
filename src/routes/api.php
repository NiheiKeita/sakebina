<?php

use App\Http\Controllers\Api\ShoutController;
use Illuminate\Support\Facades\Route;

// 公開API（認証不要）
Route::apiResource('shouts', ShoutController::class)->only(['index', 'store', 'show']);
