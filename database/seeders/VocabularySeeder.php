<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $words = [
            // Jawa (id: 1)
            ['language_id' => 1, 'word' => 'Sugeng rawuh', 'meaning' => 'Selamat datang', 'pronunciation' => 'su-geng ra-wuh', 'example_sentence' => 'Sugeng rawuh ing omah kula.', 'category' => 'Sapaan'],
            ['language_id' => 1, 'word' => 'Matur nuwun', 'meaning' => 'Terima kasih', 'pronunciation' => 'ma-tur nu-wun', 'example_sentence' => 'Matur nuwun sanget.', 'category' => 'Sapaan'],
            ['language_id' => 1, 'word' => 'Apa kabar', 'meaning' => 'Apa kabar', 'pronunciation' => 'a-pa ka-bar', 'example_sentence' => 'Piye kabarmu?', 'category' => 'Sapaan'],
            // Sunda (id: 2)
            ['language_id' => 2, 'word' => 'Wilujeng sumping', 'meaning' => 'Selamat datang', 'pronunciation' => 'wi-lu-jeng sum-ping', 'example_sentence' => 'Wilujeng sumping di bumi abdi.', 'category' => 'Sapaan'],
            ['language_id' => 2, 'word' => 'Hatur nuhun', 'meaning' => 'Terima kasih', 'pronunciation' => 'ha-tur nu-hun', 'example_sentence' => 'Hatur nuhun pisan.', 'category' => 'Sapaan'],
            // Bali (id: 3)
            ['language_id' => 3, 'word' => 'Om swastiastu', 'meaning' => 'Salam pembuka', 'pronunciation' => 'om swas-tias-tu', 'example_sentence' => 'Om swastiastu, napi gatrane?', 'category' => 'Sapaan'],
            ['language_id' => 3, 'word' => 'Suksma', 'meaning' => 'Terima kasih', 'pronunciation' => 'suk-sma', 'example_sentence' => 'Suksma pisan.', 'category' => 'Sapaan'],
            // Batak (id: 4)
            ['language_id' => 4, 'word' => 'Horas', 'meaning' => 'Salam / Sehat', 'pronunciation' => 'ho-ras', 'example_sentence' => 'Horas! Aha do goarmu?', 'category' => 'Sapaan'],
            // Minang (id: 5)
            ['language_id' => 5, 'word' => 'Salamaik datang', 'meaning' => 'Selamat datang', 'pronunciation' => 'sa-la-maik da-tang', 'example_sentence' => 'Salamaik datang di rumah ambo.', 'category' => 'Sapaan'],
            // Bugis (id: 6)
            ['language_id' => 6, 'word' => 'Assalamu alaikum', 'meaning' => 'Salam', 'pronunciation' => 'as-sa-la-mu a-lai-kum', 'example_sentence' => 'Assalamu alaikum, aga kabara?', 'category' => 'Sapaan'],
        ];

        foreach ($words as $word) {
            \App\Models\Vocabulary::create($word);
        }
    }
}
