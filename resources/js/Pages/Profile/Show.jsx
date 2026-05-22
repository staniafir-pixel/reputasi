import MainLayout from '@/Layouts/MainLayout';
import { Link, router, useForm } from '@inertiajs/react';

export default function ProfileShow({ user, streakCount, progress, quizResults }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/profil');
    };

    const moduleLabels = { aksara: 'Aksara Nusantara', cerita: 'Cerita Rakyat', musik_tari: 'Musik & Tari' };
    const moduleColors = { aksara: '#314E2B', cerita: '#A13A1E', musik_tari: '#CF5527' };
    const completedModules = progress?.filter(p => p.completed)?.length || 0;
    const passedQuiz = quizResults?.filter(r => r.passed)?.length || 0;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="p-8 rounded-3xl mb-6 text-white" style={{ backgroundColor: '#314E2B' }}>
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                            style={{ backgroundColor: '#F1C166', color: '#314E2B' }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                            <p className="opacity-75 text-sm">{user?.email}</p>
                            {user?.role === 'admin' && (
                                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: '#F1C166', color: '#314E2B' }}>Admin</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { icon: '🔥', value: streakCount, label: 'Hari Streak' },
                        { icon: '📚', value: completedModules, label: 'Modul Selesai' },
                        { icon: '🏆', value: passedQuiz, label: 'Quiz Lulus' },
                    ].map(stat => (
                        <div key={stat.label} className="p-5 rounded-2xl border-2 text-center"
                            style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <p className="text-2xl font-bold" style={{ color: '#542916' }}>{stat.value}</p>
                            <p className="text-xs" style={{ color: '#673C34' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Edit Profile */}
                    <div className="p-6 rounded-3xl border-2" style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                        <h2 className="text-lg font-bold mb-4" style={{ color: '#542916' }}>Edit Profil</h2>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                                    style={{ backgroundColor: '#FFF4D7', color: '#542916' }}>Nama</label>
                                <input type="text" value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 bg-transparent outline-none text-sm"
                                    style={{ borderColor: '#F1C166', color: '#542916' }} />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                                    style={{ backgroundColor: '#FFF4D7', color: '#542916' }}>Email</label>
                                <input type="email" value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 bg-transparent outline-none text-sm"
                                    style={{ borderColor: '#F1C166', color: '#542916' }} />
                            </div>
                            <button type="submit" disabled={processing}
                                className="py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
                                style={{ backgroundColor: '#A13A1E' }}>
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>

                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F1C166' }}>
                            <Link href="/profile" className="text-sm font-medium hover:opacity-70"
                                style={{ color: '#673C34' }}>
                                Ubah Password →
                            </Link>
                        </div>
                    </div>

                    {/* Progress & Quiz History */}
                    <div className="flex flex-col gap-4">
                        {/* Module Progress */}
                        <div className="p-6 rounded-3xl border-2" style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                            <h2 className="text-lg font-bold mb-4" style={{ color: '#542916' }}>Progress Modul</h2>
                            {progress?.length > 0 ? (
                                <div className="flex flex-col gap-3">
                                    {progress.map(p => (
                                        <div key={p.id}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium" style={{ color: '#542916' }}>
                                                    {p.module?.title}
                                                </span>
                                                <span className="text-xs" style={{ color: moduleColors[p.module?.type] }}>
                                                    {p.completed ? '✓ Selesai' : 'Dalam progres'}
                                                </span>
                                            </div>
                                            <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#F1C166' }}>
                                                <div className="h-2 rounded-full"
                                                    style={{ width: p.completed ? '100%' : '50%', backgroundColor: moduleColors[p.module?.type] }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm" style={{ color: '#673C34' }}>Belum ada progress.</p>
                            )}
                        </div>

                        {/* Quiz History */}
                        <div className="p-6 rounded-3xl border-2" style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                            <h2 className="text-lg font-bold mb-4" style={{ color: '#542916' }}>Riwayat Quiz</h2>
                            {quizResults?.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {quizResults.slice(0, 5).map(r => (
                                        <div key={r.id} className="flex items-center justify-between p-3 rounded-xl"
                                            style={{ backgroundColor: '#FEFAF0' }}>
                                            <span className="text-sm font-medium" style={{ color: '#542916' }}>
                                                {r.level?.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold" style={{ color: r.passed ? '#314E2B' : '#A13A1E' }}>
                                                    {r.score}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded-full"
                                                    style={{ backgroundColor: r.passed ? '#314E2B' : '#A13A1E', color: '#fff' }}>
                                                    {r.passed ? 'Lulus' : 'Gagal'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm" style={{ color: '#673C34' }}>Belum pernah quiz.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <div className="mt-6 text-center">
                    <button onClick={() => router.post('/logout')}
                        className="px-6 py-3 rounded-xl border-2 text-sm font-semibold hover:opacity-80 transition-all"
                        style={{ borderColor: '#A13A1E', color: '#A13A1E' }}>
                        Keluar dari Akun
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}