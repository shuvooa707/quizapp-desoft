<?php

namespace App\Services;

use App\Models\Score;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Collection;

class UserService
{
    public function getUsers()
    {
        $scores = Score::query()
            ->select("user_id", DB::raw('avg(score) as avg_score, count(*) as count'))
            ->with(["user" => function ($query) {
                $query->select("id", "name", "status");
            }])
            ->groupBy('user_id')
            ->orderBy('avg_score', 'desc')
            ->get();

        return $scores->map(function ($score, $i) {
            $score["rank"] = $i + 1;
            return $score;
        });
    }
}