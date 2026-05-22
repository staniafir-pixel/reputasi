import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    BungaEmas, BungaHijau, BungaMerah,
    AwnCloud, GridBatik, KipasPattern
} from '@/Components/BatikIcons';

export default function Welcome() {
    const { auth } = usePage().props;

    const features = [
        {
            icon: '📖',
            motif: <BungaEmas size={36}/>,
            title: 'Kamus Bahasa Daerah',
            desc: 'Pelajari kosakata dari berbagai bahasa daerah dengan contoh kalimat dan pelafalan.',
            href: '/kamus',
        },
        {
            icon: '🎭',
            motif: <BungaHijau size={36}/>,
            title: 'Modul Pembelajaran',
            desc: 'Aksara daerah, cerita rakyat, dan seni musik tari dalam format interaktif.',
            href: '/modul',
        },
        {
            icon: '🗺️',
            motif: <GridBatik size={36}/>,
            title: 'Peta Budaya',
            desc: 'Jelajahi peta interaktif Indonesia dan temukan kekayaan budaya tiap daerah.',
            href: '/peta-budaya',
        },
        {
            icon: '🏆',
            motif: <BungaMerah size={36}/>,
            title: 'Quiz Budaya',
            desc: 'Uji pengetahuan lewat 10 level quiz bertema kebudayaan Nusantara.',
            href: '/quiz',
        },
        {
            icon: '📜',
            motif: <AwnCloud size={44}/>,
            title: 'Artikel Sejarah',
            desc: 'Baca artikel mendalam tentang sejarah lokal dan tradisi dari seluruh penjuru Indonesia.',
            href: '/artikel',
        },
        {
            icon: '🔥',
            motif: <BungaEmas size={36}/>,
            title: 'Streak Harian',
            desc: 'Jaga konsistensi belajar dengan sistem streak dan pantau perkembangan kamu setiap hari.',
            href: auth?.user ? '/dashboard' : '/register',
        },
    ];

    return (
        <MainLayout>

            {/* ===== HERO ===== */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">

                {/* Corner decorations — top right */}
                <div className="absolute top-0 right-0 flex flex-col items-end gap-1 p-2 pointer-events-none">
                    <BungaHijau size={64}/>
                    <KipasPattern size={88} color="#A13A1E"/>
                    <BungaEmas size={80}/>
                </div>

                {/* Corner decorations — bottom left */}
                <div className="absolute bottom-0 left-0 p-2 pointer-events-none flex items-end gap-1">
                    <div className="flex flex-col gap-1">
                        <KipasPattern size={96} color="#D4652A"/>
                        <div className="flex gap-1">
                            <BungaMerah size={72}/>
                            <GridBatik size={56}/>
                        </div>
                    </div>
                    <AwnCloud size={80} className="mb-4"/>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
                    <div className="max-w-2xl">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#F1C166]/20 border border-[#F1C166]/60 rounded-full px-4 py-2 mb-8">
                            <BungaEmas size={16}/>
                            <span className="text-sm font-medium text-[#542916]">
                                Platform Budaya Nusantara
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-7xl font-bold text-[#542916] leading-[1.1] mb-6">
                            Lestarikan<br/>
                            <span className="text-[#A13A1E]">Budaya</span><br/>
                            Nusantara
                        </h1>

                        <p className="text-base md:text-lg text-[#542916]/65 max-w-md mb-10 leading-relaxed">
                            Pelajari bahasa daerah, seni tradisional, sejarah lokal, dan kearifan ekologi dari seluruh penjuru Indonesia.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 bg-[#542916] text-[#FEFAF0] px-8 py-4 rounded-full font-semibold hover:bg-[#A13A1E] transition-all duration-200 shadow-lg shadow-[#542916]/25 hover:-translate-y-0.5"
                                >
                                    Mulai Belajar <span>→</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center gap-2 bg-[#542916] text-[#FEFAF0] px-8 py-4 rounded-full font-semibold hover:bg-[#A13A1E] transition-all duration-200 shadow-lg shadow-[#542916]/25 hover:-translate-y-0.5"
                                    >
                                        Mulai Sekarang <span>→</span>
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center border-2 border-[#542916] text-[#542916] px-8 py-4 rounded-full font-semibold hover:bg-[#542916]/5 transition-all duration-200"
                                    >
                                        Sudah Punya Akun
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 pt-8 border-t border-[#542916]/10">
                            {[
                                { num: '500+', label: 'Kosakata Daerah' },
                                { num: '10', label: 'Level Quiz' },
                                { num: '34', label: 'Provinsi' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div className="text-2xl font-bold text-[#A13A1E]">{s.num}</div>
                                    <div className="text-xs text-[#542916]/55 mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <div className="flex justify-center mb-4">
                        <BungaHijau size={44}/>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#542916] mb-3">
                        Apa yang Bisa Kamu Pelajari?
                    </h2>
                    <p className="text-[#542916]/55 max-w-md mx-auto text-sm leading-relaxed">
                        Eksplorasi kekayaan budaya Indonesia melalui berbagai konten interaktif yang menarik
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map(f => (
                        <Link
                            key={f.title}
                            href={f.href}
                            className="group bg-white/50 border border-[#F1C166]/25 rounded-3xl p-6 hover:border-[#F1C166]/70 hover:shadow-lg hover:shadow-[#542916]/6 hover:-translate-y-1 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {f.motif}
                                <span className="text-2xl">{f.icon}</span>
                            </div>
                            <h3 className="font-bold text-[#542916] mb-2">{f.title}</h3>
                            <p className="text-sm text-[#542916]/55 leading-relaxed">{f.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="relative bg-[#542916] overflow-hidden mx-4 md:mx-8 rounded-3xl mb-20">
                <div className="absolute right-0 top-0 opacity-10 rotate-12 pointer-events-none">
                    <BungaEmas size={220}/>
                </div>
                <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
                    <GridBatik size={160}/>
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none">
                    <KipasPattern size={200} color="#F1C166"/>
                </div>
                <div className="relative z-10 text-center py-16 px-6">
                    <div className="flex justify-center mb-6">
                        <BungaEmas size={56}/>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#FEFAF0] mb-4">
                        Mulai Perjalananmu Hari Ini
                    </h2>
                    <p className="text-[#F1C166]/75 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                        Bergabung dengan ribuan pelajar yang sudah menjaga warisan budaya Nusantara
                    </p>
                    <Link
                        href={auth?.user ? '/dashboard' : '/register'}
                        className="inline-flex items-center gap-2 bg-[#F1C166] text-[#542916] px-8 py-4 rounded-full font-bold hover:bg-[#F1C166]/90 transition-all hover:-translate-y-0.5 shadow-lg"
                    >
                        {auth?.user ? 'Lanjutkan Belajar' : 'Daftar Gratis'} →
                    </Link>
                </div>
            </section>

        </MainLayout>
    );
}