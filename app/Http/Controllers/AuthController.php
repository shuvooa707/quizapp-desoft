<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use App\Services\ProfileService;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request, AuthService $authService): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $email = $request->get('email', "");
        $password = $request->get('password', "");
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            return response([
                "message" => "failed",
                "error" => "Wrong Credentials",
                "email" => $email,
                "password" => $password
            ]);
        }

        // login
        Auth::attempt([
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ]);

        $token = Auth::user()
            ->createToken("auth_token")
            ->plainTextToken;


        // prepare profile
        $profileService = new ProfileService();
        $profile = $profileService->getProfile(Auth::user()->id);

        return response([
            "message" => "success",
            "data" => [
                "token" => $token,
                "profile" => $profile
            ]
        ]);
    }

    public function register(Request $request, AuthService $authService): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $authService->register([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => $request->get('password')
        ]);
        return response([
            "message" => "success"
        ]);
    }
}
