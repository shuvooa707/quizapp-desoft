<?php

namespace App\Services;

use App\Models\Topic;
use mysql_xdevapi\Collection;

class TopicService
{
    public function getTopics() : \Illuminate\Database\Eloquent\Collection | array
    {
        return Topic::all();
    }
    public function getActiveTopics() : \Illuminate\Database\Eloquent\Collection | array
    {
        return Topic::where("status", "active")->get();
    }
}