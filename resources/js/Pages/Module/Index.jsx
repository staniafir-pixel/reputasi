import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BungaEmas, BungaHijau, BungaMerah, AwnCloud, GridBatik, KipasPattern } from '@/Components/BatikIcons';

const MODULE_COLORS = {
    'aksara':     { bg: '#314E2B', text: '#FEFAF0' },
    'cerita':     { bg: '#A13A1E', text: '#FEFAF0' },
    'musik':      { bg: '#7D3B1A', text: '#FEFAF0' },
    'musik_tari': { bg: '#7D3B1A', text: '#FEFAF0' },
};

const TYPE_ICONS = {
    'aksara':     '✍️',
    'cerita':     '📖',
    'musik':      '🎵',
    'musik_tari': '🎵',
};

const getModuleColor = (type) => {
    const key = Object.keys(MODULE_COLORS).find(k => type?.toLowerCase().includes(k));
    return MODULE_COLORS[key] ?? { bg: '#542916', text: '#FEFAF0' };
};

const getIcon = (type) => {
    const key = Object.keys(TYPE_ICONS).find(k => type?.toLowerCase().includes(k));
    return TYPE_ICONS[key] ?? '📚';
};

export default function ModuleIndex({ modules, completedCounts }) {
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
                        <span className="text-xs font-medium text-[#542916]">Pembelajaran Interaktif</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#542916] mb-3 leading-tight">
                        Modul<br/>
                        <span className="text-[#A13A1E]">Pembelajaran</span>
                    </h1>
                    <p className="text-[#542916]/55 text-sm max-w-sm leading-relaxed">
                        Pelajari aksara daerah, cerita rakyat, dan seni musik tari melalui modul interaktif.
                    </p>
                </div>
            </section>

            {/* MODULE CARDS */}
            <div className="max-w-5xl mx-auto px-6 -mt-6 pb-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules?.map(module => {
                        const colors = getModuleColor(module.type);
                        const icon = getIcon(module.type);
                        const total = module.lessons_count ?? 0;
                        const done = completedCounts?.[module.id] ?? 0;
                        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                        const isComplete = pct === 100 && total > 0;

                        return (
                            <div
                                key={module.id}
                                className="group bg-white border border-[#F1C166]/20 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#542916]/8 hover:-translate-y-1 transition-all duration-200"
                            >
                                {/* Card header */}
                                <div
                                    className="relative h-44 flex flex-col items-center justify-center gap-3 overflow-hidden"
                                    style={{ backgroundColor: colors.bg }}
                                >
                                    <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                                        <BungaEmas size={100}/>
                                    </div>
                                    <div className="absolute top-3 left-3 opacity-10 pointer-events-none">
                                        <GridBatik size={50}/>
                                    </div>
                                    <span className="text-5xl drop-shadow-lg">{icon}</span>
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                                        {module.type}
                                    </span>
                                    {isComplete && (
                                        <div className="absolute top-3 right-3 bg-[#F1C166] text-[#542916] text-xs font-bold px-2.5 py-1 rounded-full">
                                            ✓ Selesai
                                        </div>
                                    )}
                                </div>

                                {/* Card body */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#542916] mb-1.5 leading-tight">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-[#542916]/55 leading-relaxed mb-5">
                                        {module.description}
                                    </p>

                                    <div className="mb-5">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-[#542916]/50">{total} pelajaran</span>
                                            <span className="font-semibold" style={{ color: colors.bg }}>{pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#542916]/8 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${pct}%`,
                                                    backgroundColor: isComplete ? '#314E2B' : colors.bg,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <Link
                                        href={`/modul/${module.id}`}
                                        className="block w-full text-center py-3 rounded-2xl text-sm font-bold transition-all hover:opacity-90"
                                        style={{
                                            backgroundColor: colors.bg,
                                            color: colors.text,
                                            boxShadow: `0 4px 14px ${colors.bg}40`,
                                        }}
                                    >
                                        {isComplete ? 'Ulangi Modul' : pct > 0 ? 'Lanjutkan →' : 'Mulai Belajar →'}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </MainLayout>
    );
}