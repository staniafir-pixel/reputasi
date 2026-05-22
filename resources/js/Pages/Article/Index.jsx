import MainLayout from '@/Layouts/MainLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function ArticleIndex({ articles, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    const doSearch = (e) => {
        e.preventDefault();
        router.get('/artikel', { search }, { preserveState: true });
    };

    return (
        <MainLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-1" style={{ color: '#542916' }}>📰 Artikel Sejarah</h1>
                <p className="text-sm" style={{ color: '#673C34' }}>Cerita dan sejarah budaya lokal nusantara</p>
            </div>

            <form onSubmit={doSearch} className="flex gap-3 mb-6">
                <input type="text" placeholder="Cari artikel..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 outline-none text-sm"
                    style={{ borderColor: '#F1C166', backgroundColor: '#FFF4D7', color: '#542916' }} />
                <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
                    style={{ backgroundColor: '#A13A1E' }}>Cari</button>
            </form>

            {auth?.user?.role === 'admin' && (
                <div className="mb-6">
                    <Link href="/admin/artikel/create"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm"
                        style={{ backgroundColor: '#314E2B' }}>
                        + Tulis Artikel Baru
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles?.data?.length > 0 ? articles.data.map(article => (
                    <Link key={article.id} href={`/artikel/${article.id}`}
                        className="rounded-2xl border-2 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                        style={{ backgroundColor: '#FFF4D7', borderColor: '#F1C166' }}>
                        <div className="h-40 flex items-center justify-center text-6xl"
                            style={{ backgroundColor: '#F1C166' }}>📜</div>
                        <div className="p-5">
                            <div className="flex flex-wrap gap-1 mb-3">
                                {article.tags?.slice(0,2).map(tag => (
                                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ backgroundColor: '#542916', color: '#FEFAF0' }}>{tag}</span>
                                ))}
                            </div>
                            <h3 className="font-bold mb-2 line-clamp-2" style={{ color: '#542916' }}>{article.title}</h3>
                            <p className="text-xs" style={{ color: '#673C34' }}>
                                {article.author?.name} · {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </Link>
                )) : (
                    <div className="col-span-3 text-center py-16">
                        <p className="text-4xl mb-4">📭</p>
                        <p style={{ color: '#673C34' }}>Belum ada artikel.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}