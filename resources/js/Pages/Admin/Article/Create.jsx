import MainLayout from '@/Layouts/MainLayout';
import { useForm, Link } from '@inertiajs/react';

export default function ArticleCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        tags: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/artikel', {
            forceFormData: true,
        });
    };

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto">
                <Link href="/artikel" className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-70"
                    style={{ color: '#A13A1E' }}>← Kembali ke Artikel</Link>

                <h1 className="text-2xl font-bold mb-6" style={{ color: '#542916' }}>Tulis Artikel Baru</h1>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                            style={{ backgroundColor: '#FEFAF0', color: '#542916' }}>Judul Artikel</label>
                        <input type="text" value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Masukkan judul artikel..."
                            className="w-full px-4 py-4 rounded-xl border-2 bg-transparent outline-none text-sm"
                            style={{ borderColor: errors.title ? '#CF5527' : '#F1C166', color: '#542916' }} />
                        {errors.title && <p className="text-xs mt-1" style={{ color: '#CF5527' }}>{errors.title}</p>}
                    </div>

                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                            style={{ backgroundColor: '#FEFAF0', color: '#542916' }}>Tags (pisah dengan koma)</label>
                        <input type="text" value={data.tags}
                            onChange={e => setData('tags', e.target.value)}
                            placeholder="Jawa, Sejarah, Batik..."
                            className="w-full px-4 py-4 rounded-xl border-2 bg-transparent outline-none text-sm"
                            style={{ borderColor: '#F1C166', color: '#542916' }} />
                    </div>

                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                            style={{ backgroundColor: '#FEFAF0', color: '#542916' }}>Isi Artikel</label>
                        <textarea value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            rows={16}
                            placeholder="Tulis isi artikel di sini..."
                            className="w-full px-4 py-4 rounded-xl border-2 bg-transparent outline-none text-sm resize-none"
                            style={{ borderColor: errors.content ? '#CF5527' : '#F1C166', color: '#542916' }} />
                        {errors.content && <p className="text-xs mt-1" style={{ color: '#CF5527' }}>{errors.content}</p>}
                    </div>

                    <div className="flex gap-3">
                        <Link href="/artikel"
                            className="flex-1 py-4 rounded-xl border-2 font-semibold text-sm text-center"
                            style={{ borderColor: '#A13A1E', color: '#A13A1E' }}>
                            Batal
                        </Link>
                        <button type="submit" disabled={processing}
                            className="flex-1 py-4 rounded-xl font-semibold text-white text-sm disabled:opacity-50"
                            style={{ backgroundColor: '#A13A1E' }}>
                            {processing ? 'Mempublikasikan...' : 'Publikasikan'}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}