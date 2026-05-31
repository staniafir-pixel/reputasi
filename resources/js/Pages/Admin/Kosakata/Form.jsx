import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function KosakataForm({ vocabulary, languages }) {
    const isEdit = !!vocabulary;

    const { data, setData, post, put, processing, errors } = useForm({
        language_id:      vocabulary?.language_id      ?? "",
        word:             vocabulary?.word             ?? "",
        meaning:          vocabulary?.meaning          ?? "",
        pronunciation:    vocabulary?.pronunciation    ?? "",
        example_sentence: vocabulary?.example_sentence ?? "",
        category:         vocabulary?.category         ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.kosakata.update", vocabulary.id));
        } else {
            post(route("admin.kosakata.store"));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Kosakata" : "Tambah Kosakata"}>
            <div className="mx-auto max-w-2xl">
                <div className="mb-6 flex items-center gap-3">
                    <Link href={route("admin.kosakata.index")} className="text-sm font-semibold" style={{ color: "#A13A1E" }}>
                        ← Kembali
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <h1 className="text-xl font-bold" style={{ color: "#542916" }}>
                        {isEdit ? "Edit Kosakata" : "Tambah Kosakata"}
                    </h1>
                </div>

                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        {/* Bahasa */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Bahasa Daerah <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <select
                                value={data.language_id}
                                onChange={(e) => setData("language_id", e.target.value)}
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.language_id ? "#A13A1E" : "#e8dfc8", color: data.language_id ? "#542916" : "#9a8f7e" }}>
                                <option value="">Pilih bahasa...</option>
                                {languages.map((l) => (
                                    <option key={l.id} value={l.id}>{l.name} — {l.region}</option>
                                ))}
                            </select>
                            {errors.language_id && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.language_id}</p>}
                        </div>

                        {/* Kata */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Kata <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input type="text"
                                value={data.word}
                                onChange={(e) => setData("word", e.target.value)}
                                placeholder="Contoh: Ngoko"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.word ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.word && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.word}</p>}
                        </div>

                        {/* Arti */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Arti / Makna <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <textarea
                                value={data.meaning}
                                onChange={(e) => setData("meaning", e.target.value)}
                                placeholder="Arti kata dalam Bahasa Indonesia..."
                                rows={3}
                                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-none"
                                style={{ borderColor: errors.meaning ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.meaning && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.meaning}</p>}
                        </div>

                        {/* Pronunciation */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Cara Baca <span className="text-xs font-normal" style={{ color: "#9a8f7e" }}>(opsional)</span>
                            </label>
                            <input type="text"
                                value={data.pronunciation}
                                onChange={(e) => setData("pronunciation", e.target.value)}
                                placeholder="Contoh: ngo-ko"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.pronunciation ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                        </div>

                        {/* Contoh Kalimat */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Contoh Kalimat <span className="text-xs font-normal" style={{ color: "#9a8f7e" }}>(opsional)</span>
                            </label>
                            <textarea
                                value={data.example_sentence}
                                onChange={(e) => setData("example_sentence", e.target.value)}
                                placeholder="Contoh penggunaan kata dalam kalimat..."
                                rows={2}
                                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-none"
                                style={{ borderColor: errors.example_sentence ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Kategori <span className="text-xs font-normal" style={{ color: "#9a8f7e" }}>(opsional)</span>
                            </label>
                            <input type="text"
                                value={data.category}
                                onChange={(e) => setData("category", e.target.value)}
                                placeholder="Contoh: Sapaan, Bilangan, Alam..."
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.category ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link href={route("admin.kosakata.index")}
                                className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                                style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: "#314E2B" }}>
                                {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Kosakata"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
