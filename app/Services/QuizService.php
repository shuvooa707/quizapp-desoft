<?php

namespace App\Services;

use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizService
{


    public function createQuiz(string $title, string $description,  string $topicId, string $userId): Quiz
    {
        // create Quiz
        return Quiz::create([
            'title' => $title,
            'description' => $description,
            "created_by" => $userId,
            "topic_id" => $topicId,
        ]);
    }

    public function updateQuiz(string $quizId, array $data): void
    {
        $quiz = Quiz::find($quizId);
        $quiz->update([
            'title' => $data['title'] ?? $quiz->title,
            'description' => $data['description'] ?? $quiz->description,
        ]);
    }

    public function deleteQuiz(string $quizId): void
    {
        Quiz::find($quizId)?->delete();
    }

    public function calculateResult(Quiz $quiz, array $answerMap)
    {
        $questionCount = $quiz->questions->count();
        $total = $quiz->questions->reduce(function ($totalScore, $question) use ($answerMap) {
            try {
                if ($answerMap[$question->id] == $question->right_answer->id) {
                    $totalScore += 1;
                }
            } catch (\Exception $e) {
                Log::info($question);
            }
            return $totalScore;
        }, 0);

        return ($total / $questionCount) * 100;
    }
    public function calculateCorrectAnserCount(Quiz $quiz, array $answerMap)
    {
        $total = $quiz->questions->reduce(function ($totalScore, $question) use ($answerMap) {
            try {
                if ($answerMap[$question->id] == $question->right_answer->id) {
                    $totalScore += 1;
                }
            } catch (\Exception $e) {
                Log::info($question);
            }
            return $totalScore;
        }, 0);

        return $total;
    }
}