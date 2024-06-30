<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SheetRegisterController;
use App\Http\Controllers\UserRegisterController;
use App\Http\Controllers\UserinfoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('NigiwaiDashboard');
    // return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/sheet-management', function () {
    return Inertia::render('SheetManagement');
})->name('sheet-management');

Route::get('/user-register', function () {
    return Inertia::render('UserRegister');
})->name('user-register');

Route::post('/user-register', [UserinfoController::class, 'store']);

Route::get('/idl/index_idl', function () {
    return Inertia::render('PersonalGoalRegister');
})->name('idl.index_idl');

Route::get('/idl/select_idl', function () {
    return Inertia::render('PersonalGoal');
})->name('idl.select_idl');

Route::get('/user-management', function () {
    return Inertia::render('UserManagement');
})->name('user-management');



require __DIR__.'/auth.php';
