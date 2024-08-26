<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Score;
use App\Models\Topic;
use App\Models\User;
use App\Services\LeaderboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(LeaderboardService $leaderboardService)
    {
        $performers = $leaderboardService->getLeaderboard();
        $totalUsers = User::where("role", "performer")->get()->count();
        $totalQuizzes = Quiz::all()->count();
        $totalTopics = Topic::all()->count();
        $totalQuestions = Question::all()->count();
        $totalQuizzesTaken = Score::all()->count();

        return response([
            "message" => "success",
            "data" => [
                "performers" => $performers,
                "totalUsers" => $totalUsers,
                "totalQuizzes" => $totalQuizzes,
                "totalTopics" => $totalTopics,
                "totalQuestions" => $totalQuestions,
                "totalQuizzesTaken" => $totalQuizzesTaken
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
