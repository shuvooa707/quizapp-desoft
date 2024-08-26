<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Score;
use App\Services\LeaderboardService;
use App\Services\QuizService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $quizzesQuery = Quiz::query();
        if ($request->exists("topicId")) {
            $quizzesQuery->where("topic_id", $request->get("topicId"));
        }

        $quizzes = $quizzesQuery->get();
        return response([
            "message" => "success",
            "data" => [
                "quizzes" => $quizzes
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
        $quiz = Quiz::with(["questions"])
            ->where("id", $id)
            ->first();

        return response([
            "message" => "success",
            "data" => [
                "quiz" => $quiz
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        //
    }


    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
     */
    public function start(string $id)
    {

        $quiz = Quiz::with(["questions.answers"])
                    ->where("id", $id)
                    ->first();

        return response([
            "message" => "success",
            "data" => [
                "quiz" => $quiz
            ]
        ]);
    }
    public function submitQuiz(Request $request, QuizService $quizService, string $id)
    {

        sleep(2);

        $quiz = Quiz::with(["questions.answers"])
                    ->where("id", $id)
                    ->first();

        $answers = $request->get("answers");
        $answerMap = [];
        for ($i = 0; $i < count($answers); $i++) {
            $answerMap[$answers[$i][0]] = $answers[$i][1];
        }

        $score = $quizService->calculateResult($quiz, $answerMap);
        $correct_answers_count = $quizService->calculateCorrectAnserCount($quiz, $answerMap);;

        Score::create([
            "score" => $score,
            "questions_count" => $quiz->questions->count(),
            "correct_answers_count" => $correct_answers_count,
            "quiz_id" => $quiz->id,
            "user_id" => Auth::id()
        ]);


        return response([
            "message" => "success",
            "data" => [
                "result" => [
                    "score" => $score,
                    "correct_answers_count" => $correct_answers_count
                ]
            ]
        ]);
    }

    public function leaderboard(LeaderboardService $leaderboardService)
    {
        $performers = $leaderboardService->getLeaderboard();
        return response([
            "message" => "success",
            "data" => [
                "performers" => $performers,
            ]
        ]);
    }
}
