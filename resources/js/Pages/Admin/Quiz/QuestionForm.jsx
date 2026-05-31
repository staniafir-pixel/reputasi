import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function QuestionForm({ level, question }) {
    const isEdit = !!question;

    const { data, setData, post, put, processing, errors } = useForm({
        question:      question?.question      ?? "",
        options:       question?.options       ?? ["", "", "", ""],
        correct_index: question?.correct_index ?? 0,
        type:          question?.type          ?? "module",
    });

    const setOption = (idx, value) => {
        const updated = [...data.options];
        updated[idx] = value;
        setData("options", updated);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.quiz.questions.update", [level.id, question.id]));
        } else {
            post(route("admin.quiz.questions.store", level.id));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Soal" : "Tambah Soal"}>
            <div className="mx-auto max-w-2xl">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Link href={route("admin.quiz.index")} className="font-semibold" style={{ color: "#A13A1E" }}>Quiz</Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <Link href={route("admin.quiz.questions.index", level.id)} className="font-semibold" style={{ color: "#A13A1E" }}>
                        {level.title}
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <span style={{ color: "#9a8f7e" }}>{isEdit ? "Edit" : "Tambah"} Soal</span>
                </div>

                <h1 className="mb-6 text-xl font-bold" style={{ color: "#542916" }}>
                    {isEdit ? "Edit Soal" : "Tambah Soal"}
                </h1>

                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-6">

                        {/* Pertanyaan */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Pertanyaan <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <textarea
                                value={data.question}
                                onChange={(e) => setData("question", e.target.value)}
                                placeholder="Tulis pertanyaan di sini..."
                                rows={3}
                                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-none"
                                style={{ borderColor: errors.question ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.question && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.question}</p>}
                        </div>

                        {/* Opsi Jawaban */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Pilihan Jawaban <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <div className="flex flex-col gap-3">
                                {data.options.map((opt, idx) => {
                                    const isCorrect = data.correct_index === idx;
                                    return (
                                        <div key={idx} className="flex items-center gap-3">
                                            {/* Pilih jawaban benar */}
                                            <button
                                                type="button"
                                                onClick={() => setData("correct_index", idx)}
                                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition"
                                                style={{
                                                    backgroundColor: isCorrect ? "#2e7d32" : "#F1C166",
                                                    color: isCorrect ? "#fff" : "#542916",
                                                    border: isCorrect ? "2px solid #2e7d32" : "2px solid transparent",
                                                }}
                                                title="Klik untuk jadikan jawaban benar"
                                            >
                                                {String.fromCharCode(65 + idx)}
                                            </button>

                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => setOption(idx, e.target.value)}
                                                placeholder={`Opsi ${String.fromCharCode(65 + idx)}`}
                                                className="flex-1 rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                                style={{
                                                    borderColor: isCorrect ? "#a5d6a7" : (errors[`options.${idx}`] ? "#A13A1E" : "#e8dfc8"),
                                                    backgroundColor: isCorrect ? "#f1f8f1" : "#fff",
                                                    color: "#542916",
                                                }}
                                            />

                                            {isCorrect && (
                                                <span className="text-xs font-semibold" style={{ color: "#2e7d32" }}>✓ Benar</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-2 text-xs" style={{ color: "#9a8f7e" }}>
                                Klik huruf (A/B/C/D) untuk menandai jawaban yang benar.
                            </p>
                            {errors.correct_index && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.correct_index}</p>}
                        </div>

                        {/* Tipe soal */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Tipe Soal <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: "module", label: "Modul", desc: "Soal terkait materi modul" },
                                    { value: "vocab",  label: "Kosakata", desc: "Soal terkait kosakata" },
                                ].map(({ value, label, desc }) => {
                                    const selected = data.type === value;
                                    return (
                                        <button key={value} type="button"
                                            onClick={() => setData("type", value)}
                                            className="flex-1 rounded-xl border-2 px-4 py-3 text-left transition"
                                            style={{
                                                backgroundColor: selected ? "#A13A1E" : "#fff",
                                                borderColor: selected ? "#A13A1E" : "#e8dfc8",
                                            }}>
                                            <p className="text-sm font-semibold" style={{ color: selected ? "#fff" : "#542916" }}>{label}</p>
                                            <p className="mt-0.5 text-xs" style={{ color: selected ? "rgba(255,255,255,0.7)" : "#9a8f7e" }}>{desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.type && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.type}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link href={route("admin.quiz.questions.index", level.id)}
                                className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                                style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: "#A13A1E" }}>
                                {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Soal"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
