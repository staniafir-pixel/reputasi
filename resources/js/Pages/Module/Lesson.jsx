import MainLayout from '@/Layouts/MainLayout';
import { Link, router } from '@inertiajs/react';
import { BungaEmas, GridBatik, KipasPattern } from '@/Components/BatikIcons';

const MODULE_COLORS = {
    'aksara':     '#314E2B',
    'cerita':     '#A13A1E',
    'musik_tari': '#7D3B1A',
    'musik':      '#7D3B1A',
};

export default function Lesson({ module, lesson, prevLesson, nextLesson }) {
    const color = MODULE_COLORS[module?.type] ?? '#542916';

    const markComplete = () => {
        router.post(`/modul/${module.id}/pelajaran/${lesson.id}/selesai`);
    };

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-theme(spacing.24))] flex flex-col">
                <div className="max-w-3xl mx-auto px-6 w-full py-8 flex flex-col flex-1">

                    {/* Back link */}
                    <Link
                        href={`/modul/${module?.id}`}
                        className="flex items-center gap-2 text-sm font-medium mb-8 group w-fit transition-colors"
                        style={{ color }}
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        {module?.title}
                    </Link>

                    {/* Lesson header */}
                    <div
                        className="relative p-7 rounded-3xl mb-5 text-white overflow-hidden"
                        style={{ backgroundColor: color }}
                    >
                        <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
                            <BungaEmas size={90}/>
                        </div>
                        <div className="absolute top-3 left-3 opacity-10 pointer-events-none">
                            <GridBatik size={45}/>
                        </div>
                        <p className="text-sm text-white/65 mb-1.5">{module?.title}</p>
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight">{lesson?.title}</h1>
                    </div>

                    {/* Content */}
                    <div
                        className="p-7 rounded-3xl border-2 mb-5 leading-relaxed whitespace-pre-wrap text-sm flex-1"
                        style={{ backgroundColor: '#FFF8E8', borderColor: '#F1C166', color: '#542916' }}
                    >
                        {lesson?.content}
                    </div>

                    {/* Image */}
                    {lesson?.image_url && (
                        <div className="mb-5 rounded-2xl overflow-hidden border border-[#F1C166]/30">
                            <img src={`/storage/${lesson.image_url}`} alt={lesson.title} className="w-full"/>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#542916]/10">
                        {prevLesson ? (
                            <Link
                                href={`/modul/${module?.id}/pelajaran/${prevLesson.id}`}
                                className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 text-sm font-semibold transition-all hover:opacity-80"
                                style={{ borderColor: color, color }}
                            >
                                ← Sebelumnya
                            </Link>
                        ) : (
                            <div/>
                        )}

                        <button
                            onClick={markComplete}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg"
                            style={{ backgroundColor: color, boxShadow: `0 4px 14px ${color}40` }}
                        >
                            {nextLesson ? 'Selesai & Lanjut →' : '✓ Tandai Selesai'}
                        </button>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}