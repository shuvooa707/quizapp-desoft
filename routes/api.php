<?php

use App\Http\Controllers\admin\AnswerController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\QuestionController;
use App\Http\Controllers\admin\QuizController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TopicController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth/register', [AuthController::class, 'register'])->name('register');
Route::get('/init', [HomeController::class, 'init'])->name('init');


Route::middleware('auth:sanctum')->group(function () {

    Route::get("/quizzes", [\App\Http\Controllers\QuizController::class, 'index']);
    Route::get("/quizzes/{id}", [\App\Http\Controllers\QuizController::class, 'show']);
    Route::get("/quizzes/{id}/start", [\App\Http\Controllers\QuizController::class, 'start']);
    Route::post("/quizzes/{id}/submit", [\App\Http\Controllers\QuizController::class, 'submitQuiz']);

    Route::get("/leaderboard", [\App\Http\Controllers\QuizController::class, 'leaderboard']);


    /** Admin Routes **/
    Route::group(["prefix" => "admin", "middleware" => [AdminCheckMiddleware::class]], function () {

        Route::get("/dashboard/init", [DashboardController::class, 'init']);



        Route::get("/users", [UserController::class, 'index']);
        Route::post("/users/{id}/suspend", [UserController::class, 'suspend']);
        Route::post("/users/{id}/activate", [UserController::class, 'activate']);



        /*** Answers Routes ***/
        Route::get("/topics", [TopicController::class, 'index']);

        /*** Quiz Routes ***/
        Route::get("/quizzes", [QuizController::class, 'index']);
        Route::get("/quizzes/{id}", [QuizController::class, 'show']);
        Route::get("/quizzes/create/init", [QuizController::class, 'createInit']);
        Route::post("/quizzes/store", [QuizController::class, 'store']);
        Route::post("/quizzes/{id}/update", [QuizController::class, 'update']);
        Route::post("/quizzes/{id}/delete", [QuizController::class, 'destroy']);

        /*** Questions Routes ***/
        Route::get("/questions", [QuestionController::class, 'index']);
        Route::get("/questions/{id}", [QuestionController::class, 'show']);
        Route::post("/questions/store", [QuestionController::class, 'store']);
        Route::post("/questions/{id}/update", [QuestionController::class, 'update']);
        Route::post("/questions/{id}/delete", [QuestionController::class, 'destroy']);


        /*** Answers Routes ***/
        Route::get("/answers", [AnswerController::class, 'index']);
        Route::get("/answers/{id}", [AnswerController::class, 'show']);
        Route::post("/answers/store", [AnswerController::class, 'store']);
        Route::post("/answers/{id}/update", [AnswerController::class, 'update']);
        Route::post("/answers/{id}/delete", [AnswerController::class, 'destroy']);



    });
});
