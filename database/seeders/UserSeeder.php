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
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::create([
            "name" => "admin",
            "email" => "admin@admin.com",
            "password" => Hash::make("admin"),
            "role" => "admin"
        ]);
    }
}
