<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonalGoalController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SheetController;
use App\Http\Controllers\SheetPeriodSettingController;
use App\Http\Controllers\SheetImageController;
use App\Http\Controllers\UserGradeController;
use App\Http\Controllers\ConnectionUserSheetController;
use App\Http\Controllers\UserinfoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sheets/my', [SheetController::class, 'getMySheets']);
Route::get('/sheets/created', [SheetController::class, 'getCreatedSheets']);
Route::put('/sheets/{sheet}', [SheetController::class, 'update']);
Route::delete('/sheets/{sheet}', [SheetController::class, 'destroy']);

Route::get('/personal-goals', [PersonalGoalController::class, 'index']);
Route::post('/insert_idl', [PersonalGoalController::class, 'store']);

Route::post('/user-register', [UserinfoController::class, 'store']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

Route::put('/sheets/{id}/status', [SheetController::class, 'updateStatus']);

Route::put('/sheets/{id}/comments-and-status', [SheetController::class, 'updateCommentsAndStatus']);

Route::put('/sheets/{id}/supervisor-comments-and-status', [SheetController::class, 'updateSupervisorCommentsAndStatus']);

Route::put('/sheets/{id}/second-comments-and-status', [SheetController::class, 'updateSecondCommentsAndStatus']);

Route::put('/sheets/{id}/final-approval', [SheetController::class, 'finalApproval']);
Route::get('/connections-user-sheet', [ConnectionUserSheetController::class, 'index']);

Route::get('/user-grades', [UserGradeController::class, 'index']);
Route::post('/user-grades', [UserGradeController::class, 'store']);
Route::get('/user-grades/{id}', [UserGradeController::class, 'show']);
Route::put('/user-grades/{id}', [UserGradeController::class, 'update']);
Route::delete('/user-grades/{id}', [UserGradeController::class, 'destroy']);
