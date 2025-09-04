<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;

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

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running',
        'timestamp' => now()
    ]);
});

// Public routes
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show']);

// Authentication routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::put('/user', [UserController::class, 'update']);
    
    // Rent routes
    Route::get('/rents', [RentController::class, 'index']);
    Route::post('/rents', [RentController::class, 'store']);
    Route::get('/rents/{id}', [RentController::class, 'show']);
    Route::put('/rents/{id}', [RentController::class, 'update']);
    Route::delete('/rents/{id}', [RentController::class, 'destroy']);
    
    // Payment routes
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
    Route::post('/webhook', [StripeController::class, 'webhook']);
});

// Admin routes (if needed)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('admin/cars', CarController::class);
    Route::apiResource('admin/rents', RentController::class);
    Route::apiResource('admin/users', UserController::class);
});