<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use response;

// https://zenn.dev/msksgm/articles/20211130-laravel6-crud-api-server#api-%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%A9%E3%82%92%E4%BD%9C%E6%88%90
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // idの昇順になるようにソートして返す
        // sortByをすると連想配列になるので値だけ取得する
        return Task::all()->sortBy('id')->values()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // safeが使えない、、Method Illuminate\\Http\\Request::safe does not exist.
        $validated = $request->only(['title', 'description', 'scheduled_time', 'deadline']);
        // $validated = $request->safe()->only(['title', 'description', 'scheduled_time', 'deadline']);
        $task = Task::create([
            ...$validated,
            'status' => 0,
            'user_id' => 1,
        ]);
        return $task;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Task::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->only(['title', 'description', 'scheduled_time', 'deadline']);
        // $validated = $request->safe()->only(['title', 'description', 'scheduled_time', 'deadline']);
        $task = Task::where('id', $id)
            ->update([
                ...$validated,
            ]);
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $validated = $request->safe()->only(['title', 'description', 'scheduled_time', 'deadline']);
        Task::find($id)->delete();
        return response()->noContent();
    }
}
