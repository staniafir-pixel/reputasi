import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function ArticleShow({ article }) {
    return (
        <MainLayout>
            <Link href="/artikel" className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-70"
                style={{ color: '#A13A1E' }}>
                ← Kembali ke Artikel
            </Link>

            <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {article?.tags?.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ backgroundColor: '#542916', color: '#FEFAF0' }}>{tag}</span>
                    ))}
                </div>
                <h1 className="text-4xl font-bold mb-4" style={{ color: '#542916' }}>{article?.title}</h1>
                <p className="text-sm mb-8 pb-8 border-b-2" style={{ color: '#673C34', borderColor: '#F1C166' }}>
                    Ditulis oleh <strong>{article?.author?.name}</strong> ·{' '}
                    {article?.published_at && new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="prose max-w-none text-base leading-relaxed whitespace-pre-wrap"
                    style={{ color: '#542916' }}>
                    {article?.content}
                </div>
            </div>
        </MainLayout>
    );
}