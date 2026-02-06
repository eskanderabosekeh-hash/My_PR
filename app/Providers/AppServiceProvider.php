<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // public function boot(): void
    // {
    //     //
    // }
    //2222222222222222
    public function boot(): void
    {
        Paginator::useBootstrapFive(); // لجعل أرقام الصفحات تظهر بشكل أنيق
    }   
}


