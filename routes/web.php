<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SheetRegisterController;
use App\Http\Controllers\UserRegisterController;
use App\Http\Controllers\SheetPeriodSettingController;
use App\Http\Controllers\SheetImageController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\UserinfoController;
use App\Http\Controllers\SheetController;
use App\Http\Controllers\CompanyGoalController;
use App\Http\Controllers\ConnectionUserSheetController;
use App\Http\Controllers\SheetCompetencyController;
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

Route::get('/company-goal', function () {
    return Inertia::render('CompanyGoal');
})->name('company-goal');

Route::get('/user-management', function () {
    return Inertia::render('UserManagement');
})->name('user-management');

Route::get('/sheet/{sheet}', function ($sheet) {
    return Inertia::render('Sheet', ['sheetId' => $sheet]);
})->name('sheet.access');


Route::get('/subordinates', [UserinfoController::class, 'getSubordinates']);

Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');

Route::post('/sheets', [SheetController::class, 'store']);

Route::get('api/period-settings', [SheetPeriodSettingController::class, 'index']);

Route::get('api/sheet-images', [SheetImageController::class, 'index']);
Route::post('api/sheet-images', [SheetImageController::class, 'store']);

Route::get('/api/company-goal', [CompanyGoalController::class, 'getCurrentGoal']);
Route::post('/api/company-goal', [CompanyGoalController::class, 'store']);

Route::post('/api/sheets/{id}/update', [SheetController::class, 'update']);

Route::get('/api/sheet-status/{id}', [SheetController::class, 'getSheetStatus']);

Route::get('/api/sheets/{id}', [SheetController::class, 'getSheetData']);

Route::get('/sheets/{sheet}', [SheetController::class, 'show'])->name('sheets.show');
Route::get('/sheet-competencies/create', [SheetCompetencyController::class, 'create'])->name('sheet-competencies.create');
Route::post('/sheet-competencies', [SheetCompetencyController::class, 'store'])->name('sheet-competencies.store');

Route::post('/api/connections-user-sheet', [ConnectionUserSheetController::class, 'store']);
require __DIR__.'/auth.php';

