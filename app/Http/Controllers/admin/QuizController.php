<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\Topic;
use App\Models\User;
use App\Services\AnswerService;
use App\Services\AuthService;
use App\Services\QuestionService;
use App\Services\QuizService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $quizzesQuery = Quiz::with(["questions.answers", "topic", "takers"]);
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
    public
    function store(Request $request, QuizService $quizService, QuestionService $questionService, AnswerService $answerService)
    {
        $title = $request->get("title");
        $description = $request->get("description");
        $topic_id = $request->get("topic_id");

        $questions = $request->get("questions");
//        $options = $questions["options"];
//        return $questions[0]["options"];

        DB::beginTransaction();
        try {
            $quiz = $quizService->createQuiz(
                $title,
                $description,
                $topic_id,
                Auth::user()->id
            );
            collect($questions)->each(function ($question) use ($quiz, $questionService, $answerService) {
                $answers = $question["options"];
                $question = $questionService->createQuestion([
                    "title" => $question["question"],
                    "type" => "single-choice"
                ], $quiz);

                Log::info($answers);
                collect($answers)->each(function ($answer, $i) use ($question, $answerService) {
                    $answerService->createAnswer($question, [
                        "answer_text" => $answer,
                        "is_correct" => $question["correctOption"] == $i ? true : false
                    ]);
                });
            });
        } catch (\Exception $exception) {
            DB::rollBack();
            return response([
                "message" => "failed",
                "error" => $exception->getMessage()
            ], 500);
        }

        DB::commit();

        return response([
            "message" => "success",
            "data" => [
                "quiz" => $quiz
            ]
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public
    function show(string $id)
    {
        $quiz = Quiz::with(["questions.answers", "takers"])
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
    public
    function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public
    function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(string $id)
    {
        Quiz::destroy($id);

        return response([
            "message" => "success",
        ]);
    }

    public function createInit()
    {
        $topics = Topic::all();
        return response([
            "message" => "success",
            "data" => [
                "topics" => $topics
            ]
        ]);
    }
}
