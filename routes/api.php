<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Add a new user
Route::post('/adduser', [UserController::class, 'store']);

// Get all users
Route::get('/users', [UserController::class, 'index']);

// Get a specific user by ID
Route::get('/users/{id}', [UserController::class, 'show']);

// Update user details
Route::put('/users/{id}', [UserController::class, 'update']);
Route::patch('/users/{id}', [UserController::class, 'update']);

// Delete a user by ID
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Additional endpoint: Filter users by age
Route::get('/users/filter/age', [UserController::class, 'filterByAge']);
