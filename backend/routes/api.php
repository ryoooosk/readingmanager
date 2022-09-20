<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\BookController;
use App\Http\Controllers\API\UserController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// prefix <- urlの接頭辞をグループ化して設定するメソッド
Route::prefix('book')->group(function() {
    Route::get('/search', [BookController::class, 'search']);
    Route::get('/', [BookController::class, 'getAll']);
    Route::post('/', [BookController::class, 'register']);
    Route::get('/{id}', [BookController::class, 'get']);
    Route::delete('/delete/{id}', [BookController::class, 'delete']);
    Route::put('/update/{id}', [BookController::class, 'update']);
});

Route::prefix('user')->group(function() {
    Route::post('/register', [UserController::class, 'userRegister']);
    Route::put('/register/displayName', [UserController::class, 'registerDisplayname']);
});
