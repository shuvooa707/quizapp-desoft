<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class Question extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    public function getRightAnswerAttribute()
    {
        $answers = $this->answers;
        for ($i = 0; $i < count($answers); $i++) {
            if ($answers[$i]->is_correct == 1) {
                return $answers[$i];
            }
        }
    }
}
