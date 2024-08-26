<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login(string $email, string $password): bool
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return true;
        }

        return false;
    }

    public function register(array $array)
    {
        User::create([
            'name' => $array['name'],
            'email' => $array['email'],
            'password' => Hash::make($array['password']),
        ]);
    }
}