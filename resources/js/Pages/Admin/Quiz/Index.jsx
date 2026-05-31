import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function DeleteModal({ level, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Level?</h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    <span className="font-semibold" style={{ color: "#542916" }}>{level.title}</span> dan semua soalnya akan dihapus permanen.
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

export default function QuizIndex({ levels }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);

    const confirmDelete = () => {
        router.delete(route("admin.quiz.destroy", deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Quiz">
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#542916" }}>Level Quiz</h1>
                    <p className="mt-0.5 text-sm" style={{ color: "#9a8f7e" }}>{levels.length} level tersedia</p>
                </div>
                <Link href={route("admin.quiz.create")}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#A13A1E" }}>
                    + Tambah Level
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#e8dfc8" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#FFF4D7" }}>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>No. Level</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Judul</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Passing Score</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Soal</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {levels.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-sm" style={{ color: "#9a8f7e" }}>
                                    Belum ada level quiz.
                                </td>
                            </tr>
                        ) : levels.map((level) => (
                            <tr key={level.id} className="border-t hover:bg-amber-50/40"
                                style={{ borderColor: "#f0e8d5" }}>
                                <td className="px-5 py-4">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                                        style={{ backgroundColor: "#A13A1E", color: "#fff" }}>
                                        {level.level_number}
                                    </span>
                                </td>
                                <td className="px-5 py-4 font-semibold" style={{ color: "#542916" }}>
                                    {level.title}
                                </td>
                                <td className="px-5 py-4 text-center">
                                    <span className="rounded-full px-3 py-1 text-xs font-bold"
                                        style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                        {level.passing_score}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-center">
                                    <Link href={route("admin.quiz.questions.index", level.id)}
                                        className="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
                                        style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                        {level.questions_count} soal
                                    </Link>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link href={route("admin.quiz.questions.index", level.id)}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                            Soal
                                        </Link>
                                        <Link href={route("admin.quiz.edit", level.id)}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}>
                                            Edit
                                        </Link>
                                        <button onClick={() => setDeleteTarget(level)}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#fdf2f2", color: "#A13A1E", border: "1px solid #f5c6c6" }}>
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deleteTarget && (
                <DeleteModal
                    level={deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
