<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Quiz;

class AnswerService
{

    public function createAnswer(Question $question, array $answer)
    {
        Answer::create([
            "answer_text" => $answer["answer_text"],
            "is_correct" => $answer["is_correct"],
            "question_id" => $question->id
        ]);
    }
}