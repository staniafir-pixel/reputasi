<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            ['name' => 'Jawa', 'region' => 'Jawa Tengah & Timur'],
            ['name' => 'Sunda', 'region' => 'Jawa Barat'],
            ['name' => 'Bali', 'region' => 'Bali'],
            ['name' => 'Batak', 'region' => 'Sumatera Utara'],
            ['name' => 'Minang', 'region' => 'Sumatera Barat'],
            ['name' => 'Bugis', 'region' => 'Sulawesi Selatan'],
            ['name' => 'Makassar', 'region' => 'Sulawesi Selatan'],
        ];

        foreach ($languages as $lang) {
            \App\Models\Language::create($lang);
        }
    }
}
