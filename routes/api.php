<?php

use App\Http\Controllers\Api\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/filters', [ProductController::class, 'filters']);
Route::get('/products/new', fn() => response()->json([]));
Route::get('/products/top', fn() => response()->json([]));
Route::get('/products/trending', fn() => response()->json([]));
