import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function DeleteModal({ question, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Soal?</h3>
                <p className="mb-5 text-sm line-clamp-2" style={{ color: "#9a8f7e" }}>
                    "{question.question}" akan dihapus permanen.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel}
                        className="flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold"
                        style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                        Batal
                    </button>
                    <button onClick={onConfirm}
                        className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#A13A1E" }}>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function QuizQuestions({ level, questions }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);

    const confirmDelete = () => {
        router.delete(route("admin.quiz.questions.destroy", [level.id, deleteTarget.id]), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title={`Soal — Level ${level.level_number}`}>
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            {/* Breadcrumb + Header */}
            <div className="mb-6">
                <div className="mb-3 flex items-center gap-2 text-sm">
                    <Link href={route("admin.quiz.index")} className="font-semibold" style={{ color: "#A13A1E" }}>
                        Quiz
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <span style={{ color: "#9a8f7e" }}>{level.title}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: "#A13A1E" }}>
                            {level.level_number}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: "#542916" }}>{level.title}</h1>
                            <p className="text-xs" style={{ color: "#9a8f7e" }}>
                                {questions.length} soal · passing score {level.passing_score}
                            </p>
                        </div>
                    </div>
                    <Link href={route("admin.quiz.questions.create", level.id)}
                        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#A13A1E" }}>
                        + Tambah Soal
                    </Link>
                </div>
            </div>

            {/* Questions list */}
            {questions.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 py-16 text-center"
                    style={{ borderColor: "#F1E8D0", backgroundColor: "#fff" }}>
                    <p className="text-sm font-medium" style={{ color: "#9a8f7e" }}>Belum ada soal. Tambahkan sekarang.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {questions.map((q, i) => (
                        <div key={q.id} className="rounded-2xl border-2 p-5"
                            style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                            <div className="mb-3 flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                        style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                        {i + 1}
                                    </span>
                                    <p className="text-sm font-semibold leading-snug" style={{ color: "#542916" }}>
                                        {q.question}
                                    </p>
                                </div>
                                <div className="flex flex-shrink-0 gap-2">
                                    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                        style={{ backgroundColor: q.type === 'vocab' ? "#e8f4fd" : "#e8f5e9", color: q.type === 'vocab' ? "#1565c0" : "#2e7d32" }}>
                                        {q.type}
                                    </span>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="mb-3 grid grid-cols-2 gap-2">
                                {q.options?.map((opt, idx) => (
                                    <div key={idx}
                                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
                                        style={{
                                            backgroundColor: idx === q.correct_index ? "#e8f5e9" : "#FEFAF0",
                                            border: `1px solid ${idx === q.correct_index ? "#a5d6a7" : "#e8dfc8"}`,
                                            color: idx === q.correct_index ? "#2e7d32" : "#542916",
                                            fontWeight: idx === q.correct_index ? "600" : "400",
                                        }}>
                                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                            style={{
                                                backgroundColor: idx === q.correct_index ? "#2e7d32" : "#F1C166",
                                                color: idx === q.correct_index ? "#fff" : "#542916",
                                            }}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        {opt}
                                        {idx === q.correct_index && <span className="ml-auto">✓</span>}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href={route("admin.quiz.questions.edit", [level.id, q.id])}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}>
                                    Edit
                                </Link>
                                <button onClick={() => setDeleteTarget(q)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#fdf2f2", color: "#A13A1E", border: "1px solid #f5c6c6" }}>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteTarget && (
                <DeleteModal
                    question={deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
