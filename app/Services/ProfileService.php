<?php

namespace App\Services;

use App\Models\User;

class ProfileService
{
    public function getProfile($userId): array
    {
        $user = User::with(["quizzes"])
                    ->where("id", $userId)
                    ->first();

        $score = $this->calculateScore($user->quizzes);

        $profile = [
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "role" => $user->role,
            "quizzes" => $user->quizzes,
            "score" => $score
        ];


        return $profile;
    }


    public function calculateScore($quizzes): int
    {
        $total = $quizzes->reduce(function ($total, $quiz) {
            return $total + $quiz->pivot->score;
        }, 0);

        if ( count($quizzes) == 0 ) return 0;

        return (int)($total / count($quizzes));
    }

}