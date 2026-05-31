import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

function DeleteModal({ user, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: "#fff" }}>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#542916" }}>Hapus Pengguna?</h3>
                <p className="mb-5 text-sm" style={{ color: "#9a8f7e" }}>
                    <span className="font-semibold" style={{ color: "#542916" }}>{user.name}</span> ({user.email}) akan dihapus permanen beserta semua datanya.
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

function initials(name = "") {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fmtDate(d) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PenggunaIndex({ users, filters }) {
    const { props } = usePage();
    const flash = props.flash || {};
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [search, setSearch] = useState(filters.search ?? "");

    const currentUserId = props.auth?.user?.id;

    const applyFilter = (newFilters) => {
        router.get(route("admin.pengguna.index"), { ...filters, ...newFilters }, {
            preserveState: true, preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ search });
    };

    const confirmDelete = () => {
        router.delete(route("admin.pengguna.destroy", deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Pengguna">
            {flash.success && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: "#fdf2f2", color: "#A13A1E" }}>
                    {flash.error}
                </div>
            )}

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#542916" }}>Pengguna</h1>
                    <p className="mt-0.5 text-sm" style={{ color: "#9a8f7e" }}>{users.total} pengguna terdaftar</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input type="text" value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama atau email..."
                        className="rounded-xl border-2 px-4 py-2 text-sm outline-none transition focus:border-amber-400"
                        style={{ borderColor: "#e8dfc8", color: "#542916", minWidth: "240px" }}
                    />
                    <button type="submit" className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#542916" }}>
                        Cari
                    </button>
                    {(filters.search || filters.role) && (
                        <button type="button"
                            onClick={() => { setSearch(""); applyFilter({ search: "", role: "" }); }}
                            className="rounded-xl border-2 px-4 py-2 text-sm font-semibold"
                            style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                            Reset
                        </button>
                    )}
                </form>

                <div className="flex gap-2">
                    {[
                        { value: "", label: "Semua" },
                        { value: "user", label: "User" },
                        { value: "admin", label: "Admin" },
                    ].map(({ value, label }) => {
                        const active = (filters.role ?? "") === value;
                        return (
                            <button key={value} onClick={() => applyFilter({ role: value })}
                                className="rounded-xl px-4 py-2 text-sm font-semibold transition"
                                style={{
                                    backgroundColor: active ? "#2d1a0e" : "#F1E8D0",
                                    color: active ? "#F1C166" : "#542916",
                                }}>
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#e8dfc8" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ backgroundColor: "#FFF4D7" }}>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Pengguna</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Email</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Role</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Streak</th>
                            <th className="px-5 py-3.5 text-left font-semibold" style={{ color: "#542916" }}>Bergabung</th>
                            <th className="px-5 py-3.5 text-center font-semibold" style={{ color: "#542916" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center text-sm" style={{ color: "#9a8f7e" }}>
                                    Tidak ada pengguna ditemukan.
                                </td>
                            </tr>
                        ) : users.data.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-amber-50/40"
                                style={{ borderColor: "#f0e8d5" }}>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name}
                                                className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
                                        ) : (
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                                style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                                                {initials(user.name)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold" style={{ color: "#542916" }}>
                                                {user.name}
                                                {user.id === currentUserId && (
                                                    <span className="ml-2 text-xs font-normal" style={{ color: "#9a8f7e" }}>(kamu)</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-xs" style={{ color: "#9a8f7e" }}>
                                    {user.email}
                                    {user.email_verified_at && (
                                        <span className="ml-2 text-green-600">✓</span>
                                    )}
                                </td>
                                <td className="px-5 py-3.5 text-center">
                                    <span className="rounded-full px-3 py-1 text-xs font-bold"
                                        style={{
                                            backgroundColor: user.role === 'admin' ? "#2d1a0e" : "#F1E8D0",
                                            color: user.role === 'admin' ? "#F1C166" : "#542916",
                                        }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-center font-medium" style={{ color: "#542916" }}>
                                    {user.streak_count ?? 0}
                                </td>
                                <td className="px-5 py-3.5 text-xs" style={{ color: "#9a8f7e" }}>
                                    {fmtDate(user.created_at)}
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link href={route("admin.pengguna.edit", user.id)}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#FFF4D7", color: "#A13A1E", border: "1px solid #F1C166" }}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setDeleteTarget(user)}
                                            disabled={user.id === currentUserId}
                                            className="rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-30"
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
            {users.last_page > 1 && (
                <div className="mt-5 flex items-center justify-between text-sm">
                    <p style={{ color: "#9a8f7e" }}>
                        Menampilkan {users.from}–{users.to} dari {users.total}
                    </p>
                    <div className="flex gap-2">
                        {users.links.map((link, i) => (
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
                <DeleteModal user={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
            )}
        </AdminLayout>
    );
}
