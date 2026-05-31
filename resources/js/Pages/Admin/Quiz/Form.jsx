import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function QuizForm({ level }) {
    const isEdit = !!level;

    const { data, setData, post, put, processing, errors } = useForm({
        level_number:  level?.level_number  ?? "",
        title:         level?.title         ?? "",
        passing_score: level?.passing_score ?? 70,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.quiz.update", level.id));
        } else {
            post(route("admin.quiz.store"));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Level Quiz" : "Tambah Level Quiz"}>
            <div className="mx-auto max-w-lg">
                <div className="mb-6 flex items-center gap-3">
                    <Link href={route("admin.quiz.index")} className="text-sm font-semibold" style={{ color: "#A13A1E" }}>
                        ← Kembali
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <h1 className="text-xl font-bold" style={{ color: "#542916" }}>
                        {isEdit ? "Edit Level Quiz" : "Tambah Level Quiz"}
                    </h1>
                </div>

                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Nomor Level <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input type="number" min={1}
                                value={data.level_number}
                                onChange={(e) => setData("level_number", parseInt(e.target.value) || "")}
                                placeholder="Contoh: 1"
                                className="w-32 rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.level_number ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>Harus unik, tidak boleh sama dengan level lain.</p>
                            {errors.level_number && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.level_number}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Judul Level <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Contoh: Aksara Dasar"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.title ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.title && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.title}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Passing Score <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <div className="flex items-center gap-3">
                                <input type="number" min={0} max={100}
                                    value={data.passing_score}
                                    onChange={(e) => setData("passing_score", parseInt(e.target.value) || 0)}
                                    className="w-24 rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                    style={{ borderColor: errors.passing_score ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                                />
                                <span className="text-sm" style={{ color: "#9a8f7e" }}>/ 100</span>
                            </div>
                            <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>Nilai minimum untuk lulus level ini.</p>
                            {errors.passing_score && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.passing_score}</p>}
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link href={route("admin.quiz.index")}
                                className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                                style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: "#A13A1E" }}>
                                {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Level"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
