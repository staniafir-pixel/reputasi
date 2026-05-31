import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const TYPE_LABEL = {
    aksara:     "Aksara",
    cerita:     "Cerita",
    musik_tari: "Musik & Tari",
};

const TYPE_COLOR = {
    aksara:     { bg: "#314E2B", text: "#FEFAF0" },
    cerita:     { bg: "#A13A1E", text: "#FEFAF0" },
    musik_tari: { bg: "#CF5527", text: "#FEFAF0" },
};

function DeleteModal({ module, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
                style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>
                    Hapus Modul?
                </h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    <span className="font-semibold" style={{ color: "#542916" }}>{module.title}</span> dan semua pelajarannya akan dihapus permanen.
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

export default function ModulIndex({ modules }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);

    const confirmDelete = () => {
        router.delete(route("admin.modul.destroy", deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Modul">
            {/* Flash */}
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#542916" }}>Modul Pembelajaran</h1>
                    <p className="text-sm mt-0.5" style={{ color: "#9a8f7e" }}>
                        {modules.length} modul tersedia
                    </p>
                </div>
                <Link
                    href={route("admin.modul.create")}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#314E2B" }}
                >
                    + Tambah Modul
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#e8dfc8" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#FFF4D7" }}>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>#</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Judul</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Tipe</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Urutan</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Pelajaran</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-sm" style={{ color: "#9a8f7e" }}>
                                    Belum ada modul. Tambahkan sekarang.
                                </td>
                            </tr>
                        ) : modules.map((mod, i) => {
                            const typeColor = TYPE_COLOR[mod.type] ?? { bg: "#542916", text: "#FEFAF0" };
                            return (
                                <tr key={mod.id}
                                    className="border-t transition-colors hover:bg-amber-50/40"
                                    style={{ borderColor: "#f0e8d5" }}>
                                    <td className="px-5 py-4 font-medium" style={{ color: "#9a8f7e" }}>
                                        {i + 1}
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="font-semibold leading-snug" style={{ color: "#542916" }}>
                                            {mod.title}
                                        </p>
                                        {mod.description && (
                                            <p className="mt-0.5 text-xs line-clamp-1" style={{ color: "#9a8f7e" }}>
                                                {mod.description}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="rounded-full px-3 py-1 text-xs font-bold"
                                            style={{ backgroundColor: typeColor.bg, color: typeColor.text }}>
                                            {TYPE_LABEL[mod.type] ?? mod.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-center font-medium" style={{ color: "#542916" }}>
                                        {mod.order_index}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <Link
                                            href={route("admin.modul.lessons.index", mod.id)}
                                            className="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
                                            style={{ backgroundColor: "#F1E8D0", color: "#542916" }}
                                        >
                                            {mod.lessons_count} pelajaran
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={route("admin.modul.lessons.index", mod.id)}
                                                className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                                style={{ backgroundColor: "#F1E8D0", color: "#542916" }}
                                            >
                                                Pelajaran
                                            </Link>
                                            <Link
                                                href={route("admin.modul.edit", mod.id)}
                                                className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                                style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(mod)}
                                                className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                                style={{ backgroundColor: "#fdf2f2", color: "#A13A1E", border: "1px solid #f5c6c6" }}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {deleteTarget && (
                <DeleteModal
                    module={deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}