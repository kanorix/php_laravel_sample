<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // この書き方をすると、created_at, updated_atが自動で入る
        Task::create([
            'title' => Str::random(10),
            'user_id' => 1,
            'description' => 'this is description',
            'status' => 1,
        ]);
    }
}
