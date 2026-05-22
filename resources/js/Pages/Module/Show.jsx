import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BungaEmas, BungaHijau, BungaMerah, AwnCloud, GridBatik, KipasPattern } from '@/Components/BatikIcons';

const MODULE_COLORS = {
    'aksara':     { bg: '#314E2B', text: '#FEFAF0' },
    'cerita':     { bg: '#A13A1E', text: '#FEFAF0' },
    'musik':      { bg: '#7D3B1A', text: '#FEFAF0' },
    'musik_tari': { bg: '#7D3B1A', text: '#FEFAF0' },
};

const getModuleColor = (type) => {
    const key = Object.keys(MODULE_COLORS).find(k => type?.toLowerCase().includes(k));
    return MODULE_COLORS[key] ?? { bg: '#542916', text: '#FEFAF0' };
};

export default function ModuleShow({ module, completedLessons }) {
    const colors = getModuleColor(module.type);
    const lessons = module.lessons ?? [];
    const completed = completedLessons ?? [];
    const pct = lessons.length > 0 ? Math.round((completed.length / lessons.length) * 100) : 0;

    return (
        <MainLayout>

            {/* PAGE HEADER */}
        <section className="relative overflow-hidden pt-10 pb-12" style={{ backgroundColor: colors.bg }}>
            <div className="absolute top-0 right-0 flex flex-col items-end gap-1 p-2 pointer-events-none opacity-20">
                <BungaHijau size={56}/>
                <KipasPattern size={76} color="#FEFAF0"/>
                <BungaEmas size={68}/>
            </div>
            <div className="absolute bottom-0 left-0 p-2 pointer-events-none opacity-15 flex items-end gap-1">
                <div className="flex flex-col gap-1">
                    <KipasPattern size={80} color="#FEFAF0"/>
                    <div className="flex gap-1 items-end">
                        <BungaMerah size={60}/>
                        <GridBatik size={48}/>
                    </div>
                </div>
                <AwnCloud size={68} className="mb-3"/>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-6">
                {/* Back link — block sendiri */}
                <Link href="/modul" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6 group w-fit">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Kembali ke Modul
                </Link>

                {/* Badge — baris terpisah */}
                <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-5 w-fit">
                    <BungaEmas size={14}/>
                    <span className="text-xs font-medium text-white">{module.type}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                    {module.title}
                </h1>
                <p className="text-white/65 text-sm max-w-lg leading-relaxed mb-8">
                    {module.description}
                </p>

                <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-sm">
                    <div className="flex justify-between text-sm mb-3">
                        <span className="text-white/70">{lessons.length} pelajaran</span>
                        <span className="font-bold text-[#F1C166]">{pct}% selesai</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500 bg-[#F1C166]" style={{ width: `${pct}%` }}/>
                    </div>
                    <p className="text-white/50 text-xs mt-2">{completed.length} dari {lessons.length} pelajaran selesai</p>
                </div>
            </div>
        </section>

            {/* LESSON LIST */}
            <div className="max-w-3xl mx-auto px-6 mt-4 pb-20 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-lg font-bold text-[#542916]">Daftar Pelajaran</h2>
                    <div className="flex-1 h-px bg-[#542916]/10"/>
                </div>

                <div className="flex flex-col gap-3">
                    {lessons.map((lesson, index) => {
                        const isDone = completed.includes(lesson.id);
                        const prevDone = index === 0 || completed.includes(lessons[index - 1]?.id);
                        const isLocked = index !== 0 && !prevDone && !isDone;

                        return isLocked ? (
                            <div key={lesson.id} className="flex items-center gap-4 bg-white border border-[#542916]/8 rounded-2xl p-5 opacity-50 cursor-not-allowed">
                                <div className="w-10 h-10 rounded-full bg-[#542916]/10 flex items-center justify-center shrink-0">
                                    <span className="text-base">🔒</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-[#542916] text-sm">{lesson.title}</p>
                                    <p className="text-xs text-[#542916]/40 mt-0.5">Selesaikan pelajaran sebelumnya</p>
                                </div>
                                <span className="text-xs text-[#542916]/30 font-medium">Terkunci</span>
                            </div>
                        ) : (
                            <Link
                                key={lesson.id}
                                href={`/modul/${module.id}/pelajaran/${lesson.id}`}
                                className="flex items-center gap-4 bg-white border rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                                style={{ borderColor: isDone ? `${colors.bg}40` : 'rgba(84,41,22,0.1)' }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                                    style={{
                                        backgroundColor: isDone ? colors.bg : 'rgba(84,41,22,0.08)',
                                        color: isDone ? colors.text : '#542916',
                                    }}
                                >
                                    {isDone ? '✓' : index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-[#542916] text-sm group-hover:text-[#A13A1E] transition-colors">
                                        {lesson.title}
                                    </p>
                                    {lesson.duration && (
                                        <p className="text-xs text-[#542916]/40 mt-0.5">⏱ {lesson.duration} menit</p>
                                    )}
                                </div>
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                                    style={{
                                        backgroundColor: isDone ? `${colors.bg}15` : 'rgba(84,41,22,0.06)',
                                        color: isDone ? colors.bg : '#542916',
                                    }}
                                >
                                    {isDone ? 'Selesai' : 'Mulai →'}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {pct === 100 && lessons.length > 0 && (
                    <div className="mt-8 rounded-3xl p-6 text-center relative overflow-hidden" style={{ backgroundColor: colors.bg }}>
                        <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                            <BungaEmas size={80}/>
                        </div>
                        <div className="text-3xl mb-2">🎉</div>
                        <h3 className="font-bold text-white mb-1">Modul Selesai!</h3>
                        <p className="text-white/60 text-sm mb-4">Kamu telah menyelesaikan semua pelajaran di modul ini.</p>
                        <Link href="/modul" className="inline-flex items-center gap-2 bg-[#F1C166] text-[#542916] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#F1C166]/90 transition-colors">
                            Jelajahi Modul Lain →
                        </Link>
                    </div>
                )}
            </div>

        </MainLayout>
    );
}