<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();

            $table->integer("score"); // is percentage
            $table->integer("questions_count"); //
                $table->integer("correct_answers_count"); //
            $table->timestamps();

            $table
                ->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table
                ->foreignId('quiz_id')
                ->constrained('quizzes')
                ->onDelete('cascade');


            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
