<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Topic;
use App\Models\User;
use App\Services\AnswerService;
use App\Services\QuestionService;
use App\Services\QuizService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizService = new QuizService();
        $questionService = new QuestionService();
        $answerService = new AnswerService();

        for ($i = 0; $i <= 100; $i++) {

            $quizData = [
                "title" => fake()->sentence,
                "description" => fake()->realText
            ];
            $quiz = $quizService->createQuiz($quizData, rand(1,10), rand(1, 10));

            for ($j = 0; $j < rand(5, 50); $j++) {
                $questionData = [
                    "title" => fake()->sentence,
                    "type" => "single-choice"
                ];
                $question = $questionService->createQuestion($questionData, $quiz);

                $answersCount = rand(3, 6);
                for ($k = 0; $k < $answersCount; $k++) {
                    $answerService->createAnswer($question, [
                        "answer_text" => fake()->sentence(),
                        "is_correct" => rand(0, $answersCount) == $k,
                    ]);
                }
            }
        }
    }
}
