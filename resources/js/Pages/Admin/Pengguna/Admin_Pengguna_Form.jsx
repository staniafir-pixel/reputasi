import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

function initials(name = "") {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function PenggunaForm({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name:     user.name     ?? "",
        email:    user.email    ?? "",
        role:     user.role     ?? "user",
        avatar:   user.avatar   ?? "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.pengguna.update", user.id));
    };

    return (
        <AdminLayout title="Edit Pengguna">
            <div className="mx-auto max-w-lg">
                <div className="mb-6 flex items-center gap-3">
                    <Link href={route("admin.pengguna.index")} className="text-sm font-semibold" style={{ color: "#A13A1E" }}>
                        ← Kembali
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <h1 className="text-xl font-bold" style={{ color: "#542916" }}>Edit Pengguna</h1>
                </div>

                {/* Avatar preview */}
                <div className="mb-5 flex items-center gap-4">
                    {data.avatar ? (
                        <img src={data.avatar} alt={data.name}
                            className="h-16 w-16 rounded-full object-cover"
                            onError={(e) => e.target.style.display = "none"} />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                            style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                            {initials(data.name)}
                        </div>
                    )}
                    <div>
                        <p className="font-semibold" style={{ color: "#542916" }}>{user.name}</p>
                        <p className="text-xs" style={{ color: "#9a8f7e" }}>
                            Bergabung {new Date(user.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                        </p>
                        <p className="text-xs" style={{ color: "#9a8f7e" }}>
                            Streak: {user.streak_count ?? 0} hari
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        {/* Nama */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Nama <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input type="text" value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.name ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.name && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Email <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input type="email" value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.email ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.email && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.email}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Role <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: "user", label: "User", desc: "Akses halaman biasa" },
                                    { value: "admin", label: "Admin", desc: "Akses panel admin" },
                                ].map(({ value, label, desc }) => {
                                    const selected = data.role === value;
                                    return (
                                        <button key={value} type="button"
                                            onClick={() => setData("role", value)}
                                            className="flex-1 rounded-xl border-2 px-4 py-3 text-left transition"
                                            style={{
                                                backgroundColor: selected ? "#2d1a0e" : "#fff",
                                                borderColor: selected ? "#2d1a0e" : "#e8dfc8",
                                            }}>
                                            <p className="text-sm font-bold" style={{ color: selected ? "#F1C166" : "#542916" }}>{label}</p>
                                            <p className="mt-0.5 text-xs" style={{ color: selected ? "rgba(241,193,102,0.7)" : "#9a8f7e" }}>{desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.role}</p>}
                        </div>

                        {/* Avatar URL */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                URL Avatar <span className="text-xs font-normal" style={{ color: "#9a8f7e" }}>(opsional)</span>
                            </label>
                            <input type="text" value={data.avatar}
                                onChange={(e) => setData("avatar", e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.avatar ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                        </div>

                        {/* Reset Password */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Password Baru <span className="text-xs font-normal" style={{ color: "#9a8f7e" }}>(kosongkan jika tidak diubah)</span>
                            </label>
                            <input type="password" value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                placeholder="Min. 8 karakter"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.password ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.password && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.password}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link href={route("admin.pengguna.index")}
                                className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                                style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: "#2d1a0e" }}>
                                {processing ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
