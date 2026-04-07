<?php

use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;


// Web Routes
Route::redirect('/', 'posts');
Route::resource('posts', PostController::class);
Route::get('/{user}/posts', [DashboardController::class, 'userPosts'])->name('posts.user');

Route::middleware(['auth', 'can:admin-access'])->prefix('admin')->group(function(){
    // Admin dashboard route
    Route::get('/admin-dashboard', [AdminController::class, 'index'])->name('admin.admin-dashboard');

    // User management routes
    Route::delete('/users/{user}', [AdminController::class, 'trash'])->name('admin.users.trash');
    Route::delete('/users/{user}/force', [AdminController::class, 'permanentlyDelete'])->withTrashed()->name('admin.users.forceDelete');
    Route::post('/users/{user}/restore', [AdminController::class, 'restore'])->withTrashed()->name('admin.users.restore');
    Route::patch('/users/{user}', [AdminController::class, 'update'])->name('admin.users.update');


    // Post management routes
    Route::patch('/posts/{post}/approve', [AdminController::class, 'approvePost'])->name('admin.posts.approve');
    Route::patch('/posts/{post}/reject', [AdminController::class, 'rejectPost'])->name('admin.posts.reject');
});


Route::middleware('auth')->group(function () {
    // Dashboard route
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('verified')->name('dashboard');
    
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Email verification routes
    Route::get('/email/verify', [AuthController::class, 'verifyNotice'])->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware('signed')->name('verification.verify');
    Route::post('/email/verification-notification', [AuthController::class, 'resendEmail'])->middleware('throttle:6,1')->name('verification.send');
});


Route::middleware('guest')->group(function () {

    // Registration and login routes
    Route::view('/signup', 'auth.signup')->name('signup');
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::view('/login', 'auth.login')->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    // Password reset routes
    Route::view('/forgot-password', 'auth.forgot-password')->name('password.request');
    Route::post('/forgot-password', [ResetPasswordController::class, 'passwordEmail']);
    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'passwordReset'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'passwordUpdate'])->name('password.update');
});
