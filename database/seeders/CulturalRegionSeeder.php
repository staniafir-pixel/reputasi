<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CulturalRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ['name' => 'Jawa', 'island' => 'Jawa', 'svg_region_id' => 'jawa', 'description' => 'Pulau Jawa dikenal dengan budaya Jawa dan Sunda yang kaya, batik, wayang, dan gamelan.', 'highlights' => ['Batik', 'Wayang', 'Gamelan', 'Keraton']],
            ['name' => 'Bali', 'island' => 'Bali', 'svg_region_id' => 'bali', 'description' => 'Bali terkenal dengan seni tari, upacara keagamaan Hindu, dan arsitektur pura yang megah.', 'highlights' => ['Tari Kecak', 'Pura', 'Ogoh-ogoh', 'Subak']],
            ['name' => 'Sumatera', 'island' => 'Sumatera', 'svg_region_id' => 'sumatera', 'description' => 'Sumatera memiliki keragaman budaya dari Batak, Minang, Aceh, hingga Melayu.', 'highlights' => ['Rumah Gadang', 'Ulos', 'Randai', 'Tari Saman']],
            ['name' => 'Kalimantan', 'island' => 'Kalimantan', 'svg_region_id' => 'kalimantan', 'description' => 'Kalimantan adalah rumah suku Dayak dengan tradisi ukiran, tato, dan upacara adat yang unik.', 'highlights' => ['Mandau', 'Ukiran Dayak', 'Rumah Betang', 'Tari Hudoq']],
            ['name' => 'Sulawesi', 'island' => 'Sulawesi', 'svg_region_id' => 'sulawesi', 'description' => 'Sulawesi kaya budaya Bugis, Toraja, dan Manado dengan tradisi berlayar dan upacara Rambu Solo.', 'highlights' => ['Rambu Solo', 'Tongkonan', 'Perahu Phinisi', 'Tari Pakarena']],
            ['name' => 'Papua', 'island' => 'Papua', 'svg_region_id' => 'papua', 'description' => 'Papua menyimpan kekayaan budaya asli yang luar biasa, dari honai hingga tari Yospan.', 'highlights' => ['Koteka', 'Honai', 'Tari Yospan', 'Noken']],
        ];

        foreach ($regions as $region) {
            \App\Models\CulturalRegion::create($region);
        }
    }
}
