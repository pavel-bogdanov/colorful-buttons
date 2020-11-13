<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Factories\Interfaces\ButtonFactoryInterface;
use App\Factories\Eloquent\ButtonFactory;
use App\Factories\Interfaces\UserFactoryInterface;
use App\Factories\Eloquent\UserFactory;

class FactoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserFactoryInterface::class, UserFactory::class);
        $this->app->bind(ButtonFactoryInterface::class, ButtonFactory::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
