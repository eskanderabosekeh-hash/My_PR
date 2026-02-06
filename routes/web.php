<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
// use App\Http\Controllers\LaptopController;
Route::get('/', function () {
    // return view('index');
    return view('index');
});
Route::get('index.html', function () {
    // return view('index');
    return view('index');
});
Route::get('checkout.html', function () {
    return view('checkout');
});
Route::get('product', function () {
    return view('product');
});
Route::get('cart.html', function () {
    return view('cart');
});
Route::get('store', function () {
    return view('store');
});


