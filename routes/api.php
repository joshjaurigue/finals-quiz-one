<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/showPost/{id}', [PostController::class, 'show']);
    Route::get('/my-posts', [PostController::class, 'getUserPosts']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/delete/{id}', [PostController::class, 'delete']);
    Route::put('/edit/{id}', [PostController::class, 'edit']);
});
