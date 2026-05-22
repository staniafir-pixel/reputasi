<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'title' => 'Aksara Jawa',
                'description' => 'Pelajari aksara Hanacaraka, tulisan tradisional masyarakat Jawa yang kaya makna.',
                'type' => 'aksara',
                'order_index' => 1,
            ],
            [
                'title' => 'Cerita Rakyat Nusantara',
                'description' => 'Jelajahi kumpulan cerita rakyat dari berbagai penjuru Indonesia.',
                'type' => 'cerita',
                'order_index' => 2,
            ],
            [
                'title' => 'Musik & Tari Tradisional',
                'description' => 'Kenali keindahan musik gamelan, angklung, dan tarian tradisional Indonesia.',
                'type' => 'musik_tari',
                'order_index' => 3,
            ],
        ];

        foreach ($modules as $module) {
            $m = \App\Models\Module::create($module);

            // Buat 3 lesson dummy per modul
            for ($i = 1; $i <= 3; $i++) {
                \App\Models\ModuleLesson::create([
                    'module_id' => $m->id,
                    'title' => "Pelajaran {$i} — {$m->title}",
                    'content' => "Ini adalah konten pelajaran {$i} dari modul {$m->title}. Konten lengkap akan diisi oleh admin.",
                    'order_index' => $i,
                ]);
            }
        }
    }
}
