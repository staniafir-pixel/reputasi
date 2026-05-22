import { useState } from 'react';
import { router } from '@inertiajs/react';
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

function WordCard({ word }) {
    const langName = word.language?.name ?? '';
    const c = LANGUAGE_COLORS[langName] ?? { bg: '#542916', text: '#FEFAF0' };
    return (
        <a href={`/kamus/${word.id}`} className="group relative bg-white border border-[#F1C166]/20 rounded-3xl p-6 hover:border-[#F1C166]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden block">
            <div className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none">
                <BungaEmas size={80}/>
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: c.bg, color: c.text }}>
                    {langName}
                </span>
                {word.category && (
                    <span className="text-xs text-[#542916]/40 font-medium capitalize">{word.category}</span>
                )}
            </div>
            <h3 className="text-xl font-bold text-[#542916] mb-1.5 group-hover:text-[#A13A1E] transition-colors leading-tight">
                {word.word}
            </h3>
            <p className="text-sm text-[#542916]/65 mb-3 leading-relaxed">{word.meaning}</p>
            {word.pronunciation && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[#F1C166] text-xs">♪</span>
                    <span className="text-xs text-[#A13A1E] italic font-medium tracking-wide">/{word.pronunciation}/</span>
                </div>
            )}
            <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: c.bg }}/>
        </a>
    );
}

export default function VocabularyIndex({ vocabularies, filters, languages }) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [activeLang, setActiveLang] = useState(filters?.language ?? '');

    const doSearch = (lang = activeLang) => {
        router.get('/kamus', { search, language: lang }, { preserveState: true });
    };

    const handleLangFilter = (lang) => {
        const next = activeLang === lang ? '' : lang;
        setActiveLang(next);
        router.get('/kamus', { search, language: next }, { preserveState: true });
    };

    return (
        <MainLayout>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden bg-[#FEFAF0] pt-8 pb-16">
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

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 bg-[#F1C166]/20 border border-[#F1C166]/50 rounded-full px-4 py-1.5 mb-5">
                        <BungaEmas size={14}/>
                        <span className="text-xs font-medium text-[#542916]">Kamus Nusantara</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#542916] mb-3 leading-tight">
                        Kamus<br/>
                        <span className="text-[#A13A1E]">Bahasa Daerah</span>
                    </h1>
                    <p className="text-[#542916]/55 text-sm max-w-sm leading-relaxed">
                        Jelajahi kosakata dari berbagai bahasa daerah Nusantara lengkap dengan pelafalan dan contoh.
                    </p>
                </div>
            </section>

            {/* SEARCH + FILTER */}
            <div className="max-w-5xl mx-auto px-6 -mt-6 relative z-10 mb-10">
                <div className="flex gap-3 bg-white border-2 border-[#F1C166]/50 rounded-2xl px-5 py-3.5 shadow-lg shadow-[#542916]/5 focus-within:border-[#F1C166] transition-colors">
                    <svg className="w-5 h-5 text-[#542916]/40 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && doSearch()}
                        placeholder="Cari kata dalam bahasa daerah..."
                        className="flex-1 bg-transparent text-[#542916] placeholder-[#542916]/35 text-sm outline-none font-medium"
                    />
                    <button
                        onClick={() => doSearch()}
                        className="bg-[#542916] text-[#FEFAF0] text-sm font-semibold px-5 py-1.5 rounded-xl hover:bg-[#A13A1E] transition-colors"
                    >
                        Cari
                    </button>
                </div>

                {languages?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => handleLangFilter('')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                activeLang === ''
                                    ? 'bg-[#542916] text-[#FEFAF0] border-[#542916]'
                                    : 'bg-white text-[#542916] border-[#542916]/20 hover:border-[#542916]/60'
                            }`}
                        >
                            Semua Bahasa
                        </button>
                        {languages.map(lang => {
                            const name = typeof lang === 'string' ? lang : lang.name;
                            const c = LANGUAGE_COLORS[name] ?? { bg: '#542916', text: '#FEFAF0' };
                            const isActive = activeLang === name;
                            return (
                                <button
                                    key={name}
                                    onClick={() => handleLangFilter(name)}
                                    className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                                    style={{
                                        backgroundColor: isActive ? c.bg : 'white',
                                        color: isActive ? c.text : '#542916',
                                        borderColor: isActive ? c.bg : 'rgba(84,41,22,0.2)',
                                    }}
                                >
                                    {name}
                                </button>
                            );
                        })} 
                    </div>
                )}
            </div>

            {/* CARDS */}
            <div className="max-w-5xl mx-auto px-6 pb-20">
                {vocabularies?.data?.length === 0 ? (
                    <div className="text-center py-20 text-[#542916]/40">
                        <BungaEmas size={48} className="mx-auto mb-4 opacity-30"/>
                        <p className="text-base font-medium">Kata tidak ditemukan</p>
                        <p className="text-sm mt-1">Coba kata kunci atau bahasa yang berbeda</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {vocabularies?.data?.map(word => (
                            <WordCard key={word.id} word={word}/>
                        ))}
                    </div>
                )}

                {vocabularies?.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {Array.from({ length: vocabularies.last_page }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => router.get('/kamus', { search, language: activeLang, page }, { preserveState: true })}
                                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                                    page === vocabularies.current_page
                                        ? 'bg-[#542916] text-[#FEFAF0]'
                                        : 'bg-white border border-[#542916]/20 text-[#542916] hover:border-[#542916]/60'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </MainLayout>
    );
}