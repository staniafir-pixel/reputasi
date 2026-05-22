import { Link } from '@inertiajs/react';

export default function Welcome() {
    const features = [
        { icon: '📖', title: 'Kamus Bahasa Daerah', desc: 'Pelajari kosakata dari Jawa, Sunda, Bali, dan banyak lagi', href: '/kamus' },
        { icon: '📚', title: 'Modul Pembelajaran', desc: 'Aksara Nusantara, Cerita Rakyat, Musik & Tari Tradisional', href: '/modul' },
        { icon: '🗺️', title: 'Peta Budaya', desc: 'Jelajahi keunikan budaya dari setiap pulau di Indonesia', href: '/peta' },
        { icon: '🎮', title: 'Quiz Interaktif', desc: 'Uji pengetahuanmu dengan 10 level quiz seru', href: '/quiz' },
        { icon: '📰', title: 'Artikel Sejarah', desc: 'Baca artikel tentang sejarah dan tradisi lokal', href: '/artikel' },
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FEFAF0' }}>
            {/* Navbar Simple */}
            <nav style={{ backgroundColor: '#FEFAF0', borderBottom: '2px solid #F1C166' }}
                className="sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: '#F1C166' }}>
                            <span className="text-lg">🌸</span>
                        </div>
                        <span className="font-bold text-xl" style={{ color: '#542916' }}>Nusantara</span>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/login"
                            className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-80"
                            style={{ borderColor: '#A13A1E', color: '#A13A1E' }}>
                            Masuk
                        </Link>
                        <Link href="/register"
                            className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: '#A13A1E' }}>
                            Daftar
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* Batik decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #F1C166 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #A13A1E 2px, transparent 2px)', backgroundSize: '20px 20px' }} />

                <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
                    <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                        style={{ backgroundColor: '#FFF4D7', color: '#CF5527' }}>
                        🌺 Platform Budaya Lokal Indonesia
                    </div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight" style={{ color: '#542916' }}>
                        Lestarikan Budaya,<br />
                        <span style={{ color: '#CF5527' }}>Bangkitkan Identitas</span>
                    </h1>
                    <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: '#673C34' }}>
                        Pelajari bahasa daerah, aksara nusantara, cerita rakyat, dan kekayaan budaya
                        Indonesia dalam satu platform yang interaktif dan menyenangkan.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/register"
                            className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:opacity-90 shadow-lg"
                            style={{ backgroundColor: '#A13A1E' }}>
                            Mulai Belajar
                        </Link>
                        <Link href="/peta"
                            className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:opacity-80 border-2"
                            style={{ borderColor: '#A13A1E', color: '#A13A1E' }}>
                            Jelajahi Peta
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#542916' }}>
                    Apa yang bisa kamu pelajari?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <Link key={f.href} href={f.href}
                            className="p-6 rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 group"
                            style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: '#542916' }}>{f.title}</h3>
                            <p className="text-sm" style={{ color: '#673C34' }}>{f.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-4 mb-16 rounded-3xl p-12 text-center"
                style={{ backgroundColor: '#314E2B' }}>
                <h2 className="text-3xl font-bold text-white mb-4">
                    Siap menjaga warisan leluhur?
                </h2>
                <p className="text-white opacity-80 mb-8">
                    Bergabung dan mulai perjalanan belajar budayamu hari ini.
                </p>
                <Link href="/register"
                    className="inline-block px-8 py-4 rounded-full font-semibold text-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: '#F1C166', color: '#314E2B' }}>
                    Daftar Gratis
                </Link>
            </section>
        </div>
    );
}