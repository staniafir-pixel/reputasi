import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BungaEmas, BungaHijau, BungaMerah, AwnCloud, GridBatik, KipasPattern } from '@/Components/BatikIcons';

const LANGUAGE_COLORS = {
    'Jawa':   { bg: '#F1C166', text: '#542916' },
    'Sunda':  { bg: '#314E2B', text: '#FEFAF0' },
    'Bali':   { bg: '#A13A1E', text: '#FEFAF0' },
    'Batak':  { bg: '#7D1F1F', text: '#FEFAF0' },
    'Minang': { bg: '#94BAD0', text: '#2a4a5e' },
    'Bugis':  { bg: '#4a3728', text: '#F1C166' },
};

export default function VocabularyShow({ word }) {
    const langName = word.language?.name ?? '';
    const c = LANGUAGE_COLORS[langName] ?? { bg: '#542916', text: '#FEFAF0' };

    return (
        <MainLayout>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden bg-[#FEFAF0] pt-8 pb-20">
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 flex flex-col items-end gap-1 p-2 pointer-events-none opacity-80">
                    <BungaHijau size={56}/>
                    <KipasPattern size={76} color="#A13A1E"/>
                    <BungaEmas size={68}/>
                </div>
                <div className="absolute bottom-0 left-0 p-2 pointer-events-none opacity-70 flex items-end gap-1">
                    <div className="flex flex-col gap-1">
                        <KipasPattern size={80} color="#D4652A"/>
                        <div className="flex gap-1 items-end">
                            <BungaMerah size={60}/>
                            <GridBatik size={48}/>
                        </div>
                    </div>
                    <AwnCloud size={68} className="mb-3"/>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    {/* Back link */}
                    <Link
                        href="/kamus"
                        className="inline-flex items-center gap-2 text-sm text-[#542916]/55 hover:text-[#542916] transition-colors mb-8 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Kembali ke Kamus
                    </Link>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-5">
                        <span
                            className="text-sm font-bold px-4 py-1.5 rounded-full"
                            style={{ backgroundColor: c.bg, color: c.text }}
                        >
                            {langName}
                        </span>
                        {word.category && (
                            <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-[#542916]/8 text-[#542916]/65 border border-[#542916]/15">
                                {word.category}
                            </span>
                        )}
                    </div>

                    {/* Word */}
                    <h1 className="text-5xl md:text-6xl font-bold text-[#542916] mb-3 leading-tight">
                        {word.word}
                    </h1>

                    {/* Pronunciation */}
                    {word.pronunciation && (
                        <div className="flex items-center gap-2">
                            <span className="text-[#F1C166] text-lg">♪</span>
                            <span className="text-lg text-[#A13A1E] italic font-medium tracking-wide">
                                /{word.pronunciation}/
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-6 -mt-8 pb-20 relative z-10">
                <div className="flex flex-col gap-4">

                    {/* Arti */}
                    <div className="bg-white border border-[#F1C166]/30 rounded-3xl p-7 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: c.bg }}/>
                            <span className="text-xs font-bold tracking-widest text-[#542916]/50 uppercase">Arti</span>
                        </div>
                        <p className="text-2xl font-semibold text-[#542916] leading-snug">
                            {word.meaning}
                        </p>
                    </div>

                    {/* Contoh Kalimat */}
                    {word.example_sentence && (
                        <div className="bg-white border border-[#F1C166]/30 rounded-3xl p-7 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-5 rounded-full bg-[#314E2B]"/>
                                <span className="text-xs font-bold tracking-widest text-[#542916]/50 uppercase">Contoh Kalimat</span>
                            </div>
                            <div className="border-l-4 border-[#F1C166] pl-5">
                                <p className="text-lg text-[#542916] italic leading-relaxed">
                                    "{word.example_sentence}"
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Info tambahan */}
                    <div className="bg-white border border-[#F1C166]/30 rounded-3xl p-7 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-5 rounded-full bg-[#A13A1E]"/>
                            <span className="text-xs font-bold tracking-widest text-[#542916]/50 uppercase">Informasi</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-[#542916]/40 mb-1">Bahasa Daerah</p>
                                <p className="font-semibold text-[#542916]">{langName}</p>
                            </div>
                            {word.category && (
                                <div>
                                    <p className="text-xs text-[#542916]/40 mb-1">Kategori</p>
                                    <p className="font-semibold text-[#542916] capitalize">{word.category}</p>
                                </div>
                            )}
                            {word.language?.region && (
                                <div>
                                    <p className="text-xs text-[#542916]/40 mb-1">Wilayah</p>
                                    <p className="font-semibold text-[#542916]">{word.language.region}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Nav bottom */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-[#542916]/10">
                    <Link
                        href="/kamus"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#542916] bg-white border border-[#542916]/20 px-5 py-2.5 rounded-full hover:border-[#542916]/60 transition-all"
                    >
                        ← Kembali ke Kamus
                    </Link>
                    <div className="flex items-center gap-2 opacity-30">
                        <BungaEmas size={20}/>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}