<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function () {
    Route::post('login', 'Api\Auth\AuthController@login');
    Route::post('logout', 'Api\Auth\AuthController@logout');
    Route::post('register', 'Api\Auth\AuthController@register');
    Route::get('checkAuth', 'Api\Auth\AuthController@me');
    
    Route::get('buttons', 'Api\ButtonController@index');
    Route::post('buttons/{id}', 'Api\ButtonController@update');
    Route::get('buttons/{position}', 'Api\ButtonController@show');
    Route::post('buttons', 'Api\ButtonController@store');
    Route::delete('buttons/{position}', 'Api\ButtonController@destroy');
});
