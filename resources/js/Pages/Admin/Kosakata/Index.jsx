import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function DeleteModal({ vocab, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Kosakata?</h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    Kata <span className="font-semibold" style={{ color: "#542916" }}>"{vocab.word}"</span> akan dihapus permanen.
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

export default function KosakataIndex({ vocabularies, languages, categories, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState(filters.search ?? "");

    const applyFilter = (newFilters) => {
        router.get(route("admin.kosakata.index"), { ...filters, ...newFilters }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ search });
    };

    const confirmDelete = () => {
        router.delete(route("admin.kosakata.destroy", deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Kosakata">
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#542916" }}>Kosakata</h1>
                    <p className="mt-0.5 text-sm" style={{ color: "#9a8f7e" }}>
                        {vocabularies.total} kata tersedia
                    </p>
                </div>
                <Link href={route("admin.kosakata.create")}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#314E2B" }}>
                    + Tambah Kosakata
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari kata atau arti..."
                        className="rounded-xl border-2 px-4 py-2 text-sm outline-none transition focus:border-amber-400"
                        style={{ borderColor: "#e8dfc8", color: "#542916", minWidth: "220px" }}
                    />
                    <button type="submit"
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#542916" }}>
                        Cari
                    </button>
                    {(filters.search || filters.language_id || filters.category) && (
                        <button type="button"
                            onClick={() => { setSearch(""); applyFilter({ search: "", language_id: "", category: "" }); }}
                            className="rounded-xl border-2 px-4 py-2 text-sm font-semibold"
                            style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                            Reset
                        </button>
                    )}
                </form>

                <select
                    value={filters.language_id ?? ""}
                    onChange={(e) => applyFilter({ language_id: e.target.value })}
                    className="rounded-xl border-2 px-4 py-2 text-sm outline-none"
                    style={{ borderColor: "#e8dfc8", color: "#542916" }}>
                    <option value="">Semua Bahasa</option>
                    {languages.map((l) => (
                        <option key={l.id} value={l.id}>{l.name} — {l.region}</option>
                    ))}
                </select>

                <select
                    value={filters.category ?? ""}
                    onChange={(e) => applyFilter({ category: e.target.value })}
                    className="rounded-xl border-2 px-4 py-2 text-sm outline-none"
                    style={{ borderColor: "#e8dfc8", color: "#542916" }}>
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#e8dfc8" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#FFF4D7" }}>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Kata</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Arti</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Bahasa</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Kategori</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vocabularies.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-sm" style={{ color: "#9a8f7e" }}>
                                    Tidak ada kosakata ditemukan.
                                </td>
                            </tr>
                        ) : vocabularies.data.map((vocab) => (
                            <tr key={vocab.id} className="border-t hover:bg-amber-50/40"
                                style={{ borderColor: "#f0e8d5" }}>
                                <td className="px-5 py-3.5">
                                    <p className="font-bold" style={{ color: "#542916" }}>{vocab.word}</p>
                                    {vocab.pronunciation && (
                                        <p className="text-xs italic" style={{ color: "#9a8f7e" }}>{vocab.pronunciation}</p>
                                    )}
                                </td>
                                <td className="px-5 py-3.5 max-w-xs">
                                    <p className="line-clamp-2 text-sm" style={{ color: "#542916" }}>{vocab.meaning}</p>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="rounded-full px-3 py-1 text-xs font-semibold"
                                        style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                                        {vocab.language?.name ?? "-"}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    {vocab.category ? (
                                        <span className="rounded-full px-3 py-1 text-xs font-semibold"
                                            style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                                            {vocab.category}
                                        </span>
                                    ) : (
                                        <span style={{ color: "#c8bfb0" }}>—</span>
                                    )}
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link href={route("admin.kosakata.edit", vocab.id)}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}>
                                            Edit
                                        </Link>
                                        <button onClick={() => setDeleteTarget(vocab)}
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

            {/* Pagination */}
            {vocabularies.last_page > 1 && (
                <div className="mt-5 flex items-center justify-between text-sm">
                    <p style={{ color: "#9a8f7e" }}>
                        Menampilkan {vocabularies.from}–{vocabularies.to} dari {vocabularies.total}
                    </p>
                    <div className="flex gap-2">
                        {vocabularies.links.map((link, i) => (
                            <button key={i}
                                disabled={!link.url || link.active}
                                onClick={() => link.url && router.get(link.url)}
                                className="rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
                                style={{
                                    backgroundColor: link.active ? "#542916" : "#F1E8D0",
                                    color: link.active ? "#fff" : "#542916",
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {deleteTarget && (
                <DeleteModal
                    vocab={deleteTarget}
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
