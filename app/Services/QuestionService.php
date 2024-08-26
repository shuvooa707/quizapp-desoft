<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Quiz;

class QuestionService
{
    private AnswerService $answerService;

    public function __construct()
    {
        $this->answerService = new AnswerService();
    }

    public function createQuestion(array $questionData, Quiz $quiz): Question
    {
        return Question::create([
                        'title' => $questionData['title'],
                        'type' => $questionData['type'],
                        'quiz_id' => $quiz->id
                    ]);
    }
}