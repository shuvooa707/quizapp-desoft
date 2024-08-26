<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use App\Models\Topic;
use http\Env\Request;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            "message" => "success",
            "data" => [
                "topics" => Topic::all()
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(\Illuminate\Http\Request $request)
    {
        Topic::create([
            "name" => $request->get("name"),
        ]);

        return response([
            "message" => "success",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Topic $topic)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        //
    }

    public function suspend(string $id)
    {
        Topic::find($id)?->update(['status' => "inactive"]);
        return response([
            "message" => "success"
        ]);
    }
    public function activate(string $id)
    {
        Topic::find($id)?->update(['status' => "active"]);
        return response([
            "message" => "success"
        ]);
    }
}
