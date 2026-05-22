import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ modules, latestArticles, streakCount, progress }) {
    const moduleIcons = { aksara: '✍️', cerita: '📖', musik_tari: '🎵' };
    const moduleColors = { aksara: '#314E2B', cerita: '#A13A1E', musik_tari: '#CF5527' };

    const getProgress = (moduleId) => {
        const p = progress?.find(p => p.module_id === moduleId);
        return p?.completed ? 100 : p ? 50 : 0;
    };

    return (
        <MainLayout>
            <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: '#314E2B' }}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Selamat Belajar! 🌺</h1>
                        <p className="text-white opacity-75 text-sm">Terus lestarikan budaya nusantara</p>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-3 rounded-xl" style={{ backgroundColor: '#F1C166' }}>
                        <span className="text-2xl">🔥</span>
                        <div>
                            <p className="font-bold text-lg" style={{ color: '#314E2B' }}>{streakCount} Hari</p>
                            <p className="text-xs" style={{ color: '#314E2B' }}>Streak aktif</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: '📖', label: 'Kamus', href: '/kamus' },
                    { icon: '🗺️', label: 'Peta Budaya', href: '/peta' },
                    { icon: '🎮', label: 'Quiz', href: '/quiz' },
                    { icon: '📰', label: 'Artikel', href: '/artikel' },
                ].map(item => (
                    <Link key={item.href} href={item.href}
                        className="p-4 rounded-2xl flex flex-col items-center gap-2 border-2 hover:shadow-md transition-all"
                        style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-sm font-semibold" style={{ color: '#542916' }}>{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold" style={{ color: '#542916' }}>Modul Pembelajaran</h2>
                    <Link href="/modul" className="text-sm font-semibold" style={{ color: '#A13A1E' }}>Lihat semua →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {modules?.map(module => {
                        const prog = getProgress(module.id);
                        return (
                            <Link key={module.id} href={`/modul/${module.id}`}
                                className="p-5 rounded-2xl border-2 hover:shadow-md transition-all"
                                style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                                    style={{ backgroundColor: moduleColors[module.type] }}>
                                    {moduleIcons[module.type]}
                                </div>
                                <h3 className="font-bold mb-1" style={{ color: '#542916' }}>{module.title}</h3>
                                <p className="text-xs mb-3" style={{ color: '#673C34' }}>{module.lessons_count} pelajaran</p>
                                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#F1C166' }}>
                                    <div className="h-2 rounded-full transition-all"
                                        style={{ width: `${prog}%`, backgroundColor: moduleColors[module.type] }} />
                                </div>
                                <p className="text-xs mt-1" style={{ color: '#673C34' }}>{prog}% selesai</p>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold" style={{ color: '#542916' }}>Artikel Terbaru</h2>
                    <Link href="/artikel" className="text-sm font-semibold" style={{ color: '#A13A1E' }}>Lihat semua →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {latestArticles?.length > 0 ? latestArticles.map(article => (
                        <Link key={article.id} href={`/artikel/${article.id}`}
                            className="p-5 rounded-2xl border-2 hover:shadow-md transition-all"
                            style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                            <div className="flex flex-wrap gap-1 mb-2">
                                {article.tags?.slice(0,2).map(tag => (
                                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium"
                                        style={{ backgroundColor: '#F1C166', color: '#542916' }}>{tag}</span>
                                ))}
                            </div>
                            <h3 className="font-bold text-sm mb-2" style={{ color: '#542916' }}>{article.title}</h3>
                            <p className="text-xs" style={{ color: '#673C34' }}>oleh {article.author?.name}</p>
                        </Link>
                    )) : (
                        <p className="text-sm col-span-3" style={{ color: '#673C34' }}>Belum ada artikel.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}