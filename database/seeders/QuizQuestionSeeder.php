<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            // Level 1 - Bahasa Daerah Dasar
            ['level_id' => 1, 'question' => 'Apa arti "Sugeng rawuh" dalam bahasa Jawa?', 'options' => ['Selamat tinggal', 'Selamat datang', 'Terima kasih', 'Permisi'], 'correct_index' => 1, 'type' => 'vocab'],
            ['level_id' => 1, 'question' => 'Apa arti "Matur nuwun" dalam bahasa Jawa?', 'options' => ['Selamat pagi', 'Maaf', 'Terima kasih', 'Tolong'], 'correct_index' => 2, 'type' => 'vocab'],
            ['level_id' => 1, 'question' => '"Hatur nuhun" adalah ungkapan terima kasih dalam bahasa...', 'options' => ['Jawa', 'Bali', 'Sunda', 'Batak'], 'correct_index' => 2, 'type' => 'vocab'],
            ['level_id' => 1, 'question' => 'Apa arti "Horas" dalam bahasa Batak?', 'options' => ['Selamat makan', 'Salam / Sehat', 'Selamat tidur', 'Apa kabar'], 'correct_index' => 1, 'type' => 'vocab'],
            ['level_id' => 1, 'question' => '"Om swastiastu" adalah salam pembuka dalam bahasa...', 'options' => ['Jawa', 'Sunda', 'Bali', 'Minang'], 'correct_index' => 2, 'type' => 'vocab'],

            // Level 2 - Aksara Nusantara
            ['level_id' => 2, 'question' => 'Aksara Jawa disebut juga dengan nama...', 'options' => ['Pallawa', 'Hanacaraka', 'Carakan', 'Lontara'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 2, 'question' => 'Berapa jumlah huruf dasar dalam aksara Jawa (Hanacaraka)?', 'options' => ['10', '15', '20', '25'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 2, 'question' => 'Aksara yang digunakan untuk menulis bahasa Bugis dan Makassar disebut...', 'options' => ['Hanacaraka', 'Lontara', 'Batak', 'Pallawa'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 2, 'question' => 'Aksara tradisional Bali diturunkan dari aksara...', 'options' => ['Arab', 'Pallawa', 'Cina', 'Latin'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 2, 'question' => 'Aksara Batak digunakan oleh suku-suku di...', 'options' => ['Sulawesi', 'Kalimantan', 'Sumatera Utara', 'Jawa Barat'], 'correct_index' => 2, 'type' => 'module'],

            // Level 3 - Cerita Rakyat
            ['level_id' => 3, 'question' => 'Cerita rakyat "Malin Kundang" berasal dari daerah...', 'options' => ['Jawa Barat', 'Sumatera Barat', 'Sulawesi', 'Kalimantan'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 3, 'question' => 'Tokoh utama cerita rakyat "Sangkuriang" adalah...', 'options' => ['Seorang nelayan', 'Seorang pangeran', 'Anak yang durhaka', 'Seorang raja'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 3, 'question' => 'Legenda "Roro Jonggrang" berkaitan dengan pembangunan candi...', 'options' => ['Borobudur', 'Prambanan', 'Mendut', 'Pawon'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 3, 'question' => 'Cerita "Bawang Merah dan Bawang Putih" mengajarkan nilai...', 'options' => ['Keberanian', 'Keserakahan vs kebaikan', 'Kecerdasan', 'Kekuatan'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 3, 'question' => 'Danau Toba terbentuk dari legenda seorang pemuda bernama...', 'options' => ['Malin', 'Sangkuriang', 'Toba', 'Samosir'], 'correct_index' => 2, 'type' => 'module'],

            // Level 4 - Musik Tradisional
            ['level_id' => 4, 'question' => 'Gamelan adalah alat musik tradisional yang berasal dari...', 'options' => ['Sumatera', 'Kalimantan', 'Jawa dan Bali', 'Sulawesi'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 4, 'question' => 'Angklung adalah alat musik tradisional dari daerah...', 'options' => ['Jawa Tengah', 'Jawa Barat (Sunda)', 'Bali', 'NTT'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 4, 'question' => 'Sasando adalah alat musik petik tradisional dari...', 'options' => ['Papua', 'Maluku', 'NTT (Rote)', 'Kalimantan'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 4, 'question' => 'Alat musik kolintang berasal dari daerah...', 'options' => ['Sulawesi Utara', 'Sulawesi Selatan', 'Jawa', 'Bali'], 'correct_index' => 0, 'type' => 'module'],
            ['level_id' => 4, 'question' => 'Angklung telah diakui sebagai warisan budaya dunia oleh...', 'options' => ['PBB', 'UNESCO', 'WHO', 'ASEAN'], 'correct_index' => 1, 'type' => 'module'],

            // Level 5 - Tari Tradisional
            ['level_id' => 5, 'question' => 'Tari Kecak berasal dari daerah...', 'options' => ['Jawa', 'Bali', 'NTB', 'Sulawesi'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 5, 'question' => 'Tari Saman berasal dari suku...', 'options' => ['Batak', 'Minang', 'Gayo (Aceh)', 'Dayak'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 5, 'question' => 'Tari Pendet adalah tari sambutan dari daerah...', 'options' => ['Jawa Tengah', 'Bali', 'NTT', 'Lombok'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 5, 'question' => 'Tari Pakarena berasal dari...', 'options' => ['Sulawesi Selatan', 'Sulawesi Utara', 'Kalimantan', 'Papua'], 'correct_index' => 0, 'type' => 'module'],
            ['level_id' => 5, 'question' => 'Tari Tor-Tor merupakan tari tradisional suku...', 'options' => ['Dayak', 'Bugis', 'Batak', 'Minang'], 'correct_index' => 2, 'type' => 'module'],

            // Level 6 - Budaya Jawa & Sunda
            ['level_id' => 6, 'question' => 'Batik Parang adalah motif batik yang berasal dari...', 'options' => ['Bali', 'Jawa', 'Sumatera', 'Kalimantan'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 6, 'question' => 'Wayang kulit adalah kesenian tradisional yang berasal dari...', 'options' => ['Bali dan Jawa', 'Sunda saja', 'Sumatera', 'Sulawesi'], 'correct_index' => 0, 'type' => 'module'],
            ['level_id' => 6, 'question' => 'Upacara Seren Taun adalah tradisi syukuran panen dari masyarakat...', 'options' => ['Jawa', 'Sunda', 'Bali', 'Batak'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 6, 'question' => '"Gamelan" dalam bahasa Jawa berarti...', 'options' => ['Memukul', 'Memainkan', 'Bernyanyi', 'Menari'], 'correct_index' => 0, 'type' => 'module'],
            ['level_id' => 6, 'question' => 'Keraton adalah istana raja yang terkenal di kota...', 'options' => ['Bandung', 'Surabaya', 'Yogyakarta', 'Semarang'], 'correct_index' => 2, 'type' => 'module'],

            // Level 7 - Budaya Sumatera
            ['level_id' => 7, 'question' => 'Rumah adat Minangkabau disebut...', 'options' => ['Tongkonan', 'Rumah Gadang', 'Honai', 'Joglo'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 7, 'question' => 'Sistem kekerabatan Minangkabau bersifat...', 'options' => ['Patrilineal', 'Bilineal', 'Matrilineal', 'Bilateral'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 7, 'question' => 'Ulos adalah kain tradisional dari suku...', 'options' => ['Minang', 'Batak', 'Melayu', 'Aceh'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 7, 'question' => 'Tari Randai adalah kesenian tradisional dari...', 'options' => ['Aceh', 'Minangkabau', 'Batak', 'Melayu'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 7, 'question' => 'Rencong adalah senjata tradisional dari...', 'options' => ['Batak', 'Minang', 'Aceh', 'Melayu'], 'correct_index' => 2, 'type' => 'module'],

            // Level 8 - Budaya Sulawesi & Kalimantan
            ['level_id' => 8, 'question' => 'Rumah adat Toraja disebut...', 'options' => ['Rumah Gadang', 'Tongkonan', 'Honai', 'Betang'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 8, 'question' => 'Upacara adat Rambu Solo adalah upacara... dari Toraja', 'options' => ['Pernikahan', 'Panen', 'Pemakaman', 'Kelahiran'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 8, 'question' => 'Perahu Phinisi adalah kapal tradisional dari suku...', 'options' => ['Dayak', 'Toraja', 'Bugis', 'Mandar'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 8, 'question' => 'Rumah Betang adalah rumah panjang tradisional suku...', 'options' => ['Bugis', 'Dayak', 'Toraja', 'Manado'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 8, 'question' => 'Mandau adalah senjata tradisional suku...', 'options' => ['Bugis', 'Toraja', 'Dayak', 'Banjar'], 'correct_index' => 2, 'type' => 'module'],

            // Level 9 - Budaya Bali & NTT
            ['level_id' => 9, 'question' => 'Sistem pengairan sawah tradisional Bali disebut...', 'options' => ['Subak', 'Sawah', 'Irigasi', 'Terasering'], 'correct_index' => 0, 'type' => 'module'],
            ['level_id' => 9, 'question' => 'Ogoh-ogoh adalah patung raksasa yang dibuat untuk perayaan...', 'options' => ['Galungan', 'Nyepi', 'Kuningan', 'Saraswati'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 9, 'question' => 'Noken adalah tas tradisional dari...', 'options' => ['Maluku', 'NTT', 'Papua', 'Kalimantan'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 9, 'question' => 'Kain tenun ikat Sumba berasal dari pulau...', 'options' => ['Lombok', 'Flores', 'Sumba', 'Timor'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 9, 'question' => 'Tari Caci adalah tari perang tradisional dari...', 'options' => ['Bali', 'Lombok', 'Flores (Manggarai)', 'Sumba'], 'correct_index' => 2, 'type' => 'module'],

            // Level 10 - Master Level
            ['level_id' => 10, 'question' => 'UNESCO menetapkan batik sebagai warisan budaya Indonesia pada tahun...', 'options' => ['2007', '2008', '2009', '2010'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 10, 'question' => 'Wayang telah diakui UNESCO sebagai warisan budaya dunia sejak tahun...', 'options' => ['2000', '2003', '2005', '2008'], 'correct_index' => 1, 'type' => 'module'],
            ['level_id' => 10, 'question' => 'Indonesia memiliki berapa bahasa daerah yang tercatat?', 'options' => ['Lebih dari 100', 'Lebih dari 300', 'Lebih dari 700', 'Lebih dari 1000'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 10, 'question' => 'Tari Saman dari Aceh diakui UNESCO pada tahun...', 'options' => ['2009', '2010', '2011', '2012'], 'correct_index' => 2, 'type' => 'module'],
            ['level_id' => 10, 'question' => 'Filosofi "Bhinneka Tunggal Ika" berasal dari kitab...', 'options' => ['Ramayana', 'Mahabharata', 'Sutasoma', 'Negarakertagama'], 'correct_index' => 2, 'type' => 'module'],
        ];

        foreach ($questions as $q) {
            QuizQuestion::create($q);
        }
    }
}