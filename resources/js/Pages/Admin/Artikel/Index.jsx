import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function DeleteModal({ article, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Artikel?</h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    <span className="font-semibold" style={{ color: "#542916" }}>"{article.title}"</span> akan dihapus permanen.
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

function fmtDate(d) {
    if (!d) return null;
    return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ArtikelIndex({ articles, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState(filters.search ?? "");

    const applyFilter = (newFilters) => {
        router.get(route("admin.artikel.index"), { ...filters, ...newFilters }, {
            preserveState: true, preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ search });
    };

    const confirmDelete = () => {
        router.delete(route("admin.artikel.destroy", deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Artikel">
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#542916" }}>Artikel</h1>
                    <p className="mt-0.5 text-sm" style={{ color: "#9a8f7e" }}>{articles.total} artikel tersedia</p>
                </div>
                <Link href={route("admin.artikel.create")}
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#CF5527" }}>
                    + Tulis Artikel
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul artikel..."
                        className="rounded-xl border-2 px-4 py-2 text-sm outline-none transition focus:border-amber-400"
                        style={{ borderColor: "#e8dfc8", color: "#542916", minWidth: "240px" }}
                    />
                    <button type="submit" className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#542916" }}>
                        Cari
                    </button>
                    {(filters.search || filters.status) && (
                        <button type="button"
                            onClick={() => { setSearch(""); applyFilter({ search: "", status: "" }); }}
                            className="rounded-xl border-2 px-4 py-2 text-sm font-semibold"
                            style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                            Reset
                        </button>
                    )}
                </form>

                <div className="flex gap-2">
                    {[
                        { value: "", label: "Semua" },
                        { value: "published", label: "Published" },
                        { value: "draft", label: "Draft" },
                    ].map(({ value, label }) => {
                        const active = (filters.status ?? "") === value;
                        return (
                            <button key={value} onClick={() => applyFilter({ status: value })}
                                className="rounded-xl px-4 py-2 text-sm font-semibold transition"
                                style={{
                                    backgroundColor: active ? "#CF5527" : "#F1E8D0",
                                    color: active ? "#fff" : "#542916",
                                }}>
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
                {articles.data.length === 0 ? (
                    <div className="rounded-2xl border-2 py-16 text-center"
                        style={{ borderColor: "#F1E8D0", backgroundColor: "#fff" }}>
                        <p className="text-sm" style={{ color: "#9a8f7e" }}>Tidak ada artikel ditemukan.</p>
                    </div>
                ) : articles.data.map((article) => {
                    const isPublished = !!article.published_at;
                    const tags = (() => {
                        try { return JSON.parse(article.tags) ?? []; }
                        catch { return []; }
                    })();

                    return (
                        <div key={article.id}
                            className="flex items-start gap-4 rounded-2xl border-2 p-5"
                            style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                            {/* Thumbnail */}
                            {article.thumbnail ? (
                                <img src={article.thumbnail} alt={article.title}
                                    className="h-16 w-24 flex-shrink-0 rounded-xl object-cover"
                                    onError={(e) => e.target.style.display = "none"}
                                />
                            ) : (
                                <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-xl text-xs"
                                    style={{ backgroundColor: "#F1E8D0", color: "#9a8f7e" }}>
                                    No img
                                </div>
                            )}

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                                        style={{
                                            backgroundColor: isPublished ? "#e8f5e9" : "#FFF4D7",
                                            color: isPublished ? "#2e7d32" : "#A13A1E",
                                        }}>
                                        {isPublished ? "Published" : "Draft"}
                                    </span>
                                    {isPublished && (
                                        <span className="text-xs" style={{ color: "#9a8f7e" }}>
                                            {fmtDate(article.published_at)}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mb-1 font-bold leading-snug" style={{ color: "#542916" }}>
                                    {article.title}
                                </h3>

                                <p className="mb-2 text-xs" style={{ color: "#9a8f7e" }}>
                                    oleh {article.author?.name ?? "—"}
                                </p>

                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.slice(0, 4).map((tag) => (
                                            <span key={tag} className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                                style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-shrink-0 items-center gap-2">
                                <Link href={route("admin.artikel.edit", article.id)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}>
                                    Edit
                                </Link>
                                <button onClick={() => setDeleteTarget(article)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                    style={{ backgroundColor: "#fdf2f2", color: "#A13A1E", border: "1px solid #f5c6c6" }}>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {articles.last_page > 1 && (
                <div className="mt-5 flex items-center justify-between text-sm">
                    <p style={{ color: "#9a8f7e" }}>
                        Menampilkan {articles.from}–{articles.to} dari {articles.total}
                    </p>
                    <div className="flex gap-2">
                        {articles.links.map((link, i) => (
                            <button key={i} disabled={!link.url || link.active}
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
                <DeleteModal article={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
            )}
        </AdminLayout>
    );
}
