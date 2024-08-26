<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;
    protected $guarded = [];



    public function questions() : HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function takers() : BelongsToMany
    {
        return $this->belongsToMany(User::class, "scores", "quiz_id", "user_id");
    }


    public function topic(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
