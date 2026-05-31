import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const TYPE_COLOR = {
    aksara:     "#314E2B",
    cerita:     "#A13A1E",
    musik_tari: "#CF5527",
};

function DeleteModal({ lesson, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Pelajaran?</h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    <span className="font-semibold" style={{ color: "#542916" }}>{lesson.title}</span> akan dihapus permanen.
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

export default function ModulLessons({ module, lessons }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);

    const typeColor = TYPE_COLOR[module.type] ?? "#542916";

    const confirmDelete = () => {
        router.delete(route("admin.modul.lessons.destroy", [module.id, deleteTarget.id]), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title={`Pelajaran — ${module.title}`}>
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            {/* Breadcrumb + Header */}
            <div className="mb-6">
                <div className="mb-3 flex items-center gap-2 text-sm">
                    <Link href={route("admin.modul.index")} className="font-semibold" style={{ color: "#A13A1E" }}>
                        Modul
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <span style={{ color: "#9a8f7e" }}>{module.title}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
                            style={{ backgroundColor: typeColor }}>
                            {module.type?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold" style={{ color: "#542916" }}>{module.title}</h1>
                            <p className="text-xs" style={{ color: "#9a8f7e" }}>
                                {lessons.length} pelajaran
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route("admin.modul.lessons.create", module.id)}
                        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#314E2B" }}
                    >
                        + Tambah Pelajaran
                    </Link>
                </div>
            </div>

            {/* Lessons list */}
            {lessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 py-16 text-center"
                    style={{ borderColor: "#F1E8D0", backgroundColor: "#fff" }}>
                    <p className="text-sm font-medium" style={{ color: "#9a8f7e" }}>
                        Belum ada pelajaran. Tambahkan sekarang.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {lessons.map((lesson, i) => (
                        <div key={lesson.id}
                            className="flex items-center gap-4 rounded-2xl border-2 p-4"
                            style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}
                        >
                            {/* Order badge */}
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                                style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                {lesson.order_index}
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold leading-snug" style={{ color: "#542916" }}>
                                    {lesson.title}
                                </p>
                                <p className="mt-0.5 truncate text-xs" style={{ color: "#9a8f7e" }}>
                                    {lesson.content?.slice(0, 100)}{lesson.content?.length > 100 ? "..." : ""}
                                </p>
                            </div>

                            {/* Image indicator */}
                            {lesson.image_url && (
                                <span className="flex-shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold"
                                    style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                    Gambar
                                </span>
                            )}

                            {/* Actions */}
                            <div className="flex flex-shrink-0 items-center gap-2">
                                <Link
                                    href={route("admin.modul.lessons.edit", [module.id, lesson.id])}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setDeleteTarget(lesson)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#fdf2f2", color: "#A13A1E", border: "1px solid #f5c6c6" }}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteTarget && (
                <DeleteModal
                    lesson={deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}