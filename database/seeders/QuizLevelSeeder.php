<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            \App\Models\QuizLevel::create([
                'level_number' => $i,
                'title' => "Level {$i}",
                'passing_score' => 70,
            ]);
        }
    }
}
