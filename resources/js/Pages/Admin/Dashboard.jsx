import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { BungaEmas, GridBatik } from "@/Components/BatikIcons";

// ── Icons ────────────────────────────────────────────────────────────────────
const IC = {
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    ),
    module: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
    ),
    lesson: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
    ),
    quiz: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    ),
    soal: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
    ),
    kamus: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
    ),
    artikel: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
    ),
    region: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
        </svg>
    ),
    arrow: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
    ),
    plus: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
    ),
};

// ── palette ──────────────────────────────────────────────────────────────────
const COLORS = {
    green:  "#314E2B",
    red:    "#A13A1E",
    orange: "#CF5527",
    purple: "#6D3A7A",
    blue:   "#2A6496",
    gold:   "#8A6A00",
    teal:   "#1D6A72",
    brown:  "#542916",
};

function fmt(n) { return (n ?? 0).toLocaleString("id-ID"); }
function initials(name = "") {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function fmtDate(d) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

// ── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, href }) {
    const inner = (
        <div className="flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4 transition-all hover:shadow-md"
            style={{ borderColor: "#F1E8D0" }}>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: color + "15", color }}>
                {icon}
            </div>
            <div>
                <p className="text-xl font-bold leading-none" style={{ color: "#2d1a0e" }}>{fmt(value)}</p>
                <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>{label}</p>
            </div>
        </div>
    );
    return href ? <Link href={href} className="block">{inner}</Link> : inner;
}

// ── CrudCard ─────────────────────────────────────────────────────────────────
function CrudCard({ icon, title, desc, color, href, createHref }) {
    return (
        <div className="rounded-2xl border-2 bg-white p-5 transition-all hover:shadow-md"
            style={{ borderColor: "#F1E8D0" }}>
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: color + "18", color }}>
                    {icon}
                </div>
                <div>
                    <p className="font-bold leading-tight" style={{ color: "#2d1a0e" }}>{title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "#9a8f7e" }}>{desc}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <Link href={href}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition hover:opacity-80"
                    style={{ backgroundColor: "#F1E8D0", color: "#542916" }}>
                    {IC.arrow} Kelola
                </Link>
                <Link href={createHref}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: color }}>
                    {IC.plus} Tambah
                </Link>
            </div>
        </div>
    );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard({ auth, stats, recentUsers }) {
    const statItems = [
        { icon: IC.users,   label: "Total Pengguna",   value: stats?.users,          color: COLORS.blue,   href: "/admin/pengguna" },
        { icon: IC.module,  label: "Total Modul",      value: stats?.modules,        color: COLORS.green,  href: "/admin/modul" },
        { icon: IC.lesson,  label: "Total Lesson",     value: stats?.lessons,        color: COLORS.teal },
        { icon: IC.quiz,    label: "Level Quiz",       value: stats?.quiz_levels,    color: COLORS.red,    href: "/admin/quiz" },
        { icon: IC.soal,    label: "Soal Quiz",        value: stats?.quiz_questions, color: COLORS.orange },
        { icon: IC.kamus,   label: "Kosakata",         value: stats?.vocabularies,   color: COLORS.purple, href: "/admin/kosakata" },
        { icon: IC.artikel, label: "Artikel",          value: stats?.articles,       color: COLORS.gold,   href: "/admin/artikel" },
        { icon: IC.region,  label: "Region Budaya",    value: stats?.regions,        color: COLORS.brown },
    ];

    const crudItems = [
        { icon: IC.module,  title: "Modul & Lesson",   desc: "Kelola materi pembelajaran",    color: COLORS.green,  href: "/admin/modul",   createHref: "/admin/modul/create" },
        { icon: IC.quiz,    title: "Quiz",             desc: "Kelola level dan soal quiz",    color: COLORS.red,    href: "/admin/quiz",    createHref: "/admin/quiz/create" },
        { icon: IC.kamus,   title: "Kosakata",         desc: "Kelola kosakata daerah",        color: COLORS.purple, href: "/admin/kosakata",   createHref: "/admin/kosakata/create" },
        { icon: IC.artikel, title: "Artikel",          desc: "Kelola konten artikel",         color: COLORS.gold,   href: "/admin/artikel", createHref: "/admin/artikel/create" },
        { icon: IC.users,   title: "Pengguna",         desc: "Kelola akun pengguna",          color: COLORS.blue,   href: "/admin/pengguna",   createHref: "/admin/pengguna" },
        { icon: IC.region,  title: "Peta Budaya",      desc: "Kelola region & info budaya",   color: COLORS.brown,  href: "/admin/peta",    createHref: "/admin/peta/create" },
    ];

    const avatarColors = Object.values(COLORS);

    return (
        <AdminLayout title="Dashboard">
            <div className="min-h-screen pb-16" style={{ backgroundColor: "#F5EFE4" }}>
                <div className="mx-auto max-w-6xl px-6">

                    {/* ── Header banner ── */}
                    <div className="relative mb-8 overflow-hidden rounded-3xl px-8 py-8"
                        style={{ backgroundColor: "#2d1a0e" }}>
                        {/* decorations */}
                        <div className="pointer-events-none absolute -top-6 -right-6 opacity-10"><BungaEmas size={130} /></div>
                        <div className="pointer-events-none absolute -bottom-6 -left-6 opacity-10"><GridBatik size={100} /></div>

                        <div className="relative z-10">
                            {/* top row: badge + pills */}
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                                    style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                                    Admin Panel
                                </span>
                                <div className="flex gap-2">
                                    {[
                                        { label: "Modul",   href: "/admin/modul" },
                                        { label: "Quiz",    href: "/admin/quiz" },
                                        { label: "Kosakata", href: "/admin/kosakata" },
                                        { label: "Artikel", href: "/admin/artikel" },
                                    ].map((n) => (
                                        <Link key={n.href} href={n.href}
                                            className="rounded-full px-4 py-1.5 text-xs font-semibold transition hover:opacity-80"
                                            style={{ backgroundColor: "rgba(241,193,102,0.12)", color: "#F1C166", border: "1px solid rgba(241,193,102,0.25)" }}>
                                            {n.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* bottom row: title + desc */}
                            <h1 className="text-2xl font-bold" style={{ color: "#FEFAF0" }}>
                                Dashboard Admin
                            </h1>
                            <p className="mt-1 text-sm" style={{ color: "rgba(254,250,240,0.55)" }}>
                                Halo, {auth?.user?.name ?? "Admin"} — kelola seluruh konten Nusantara dari sini.
                            </p>
                        </div>
                    </div>

                    {/* ── Stats ── */}
                    <section className="mb-8">
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "#9a8f7e" }}>
                            Statistik Platform
                        </h2>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {statItems.map((s) => <StatCard key={s.label} {...s} />)}
                        </div>
                    </section>

                    {/* ── CRUD Management ── */}
                    <section className="mb-8">
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "#9a8f7e" }}>
                            Manajemen Konten
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {crudItems.map((c) => <CrudCard key={c.title} {...c} />)}
                        </div>
                    </section>

                    {/* ── Recent Users ── */}
                    <section>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#9a8f7e" }}>
                                Pengguna Terbaru
                            </h2>
                            <Link href="/admin/pengguna"
                                className="text-xs font-semibold transition hover:opacity-70"
                                style={{ color: "#A13A1E" }}>
                                Lihat semua →
                            </Link>
                        </div>

                        <div className="overflow-hidden rounded-2xl border-2 bg-white" style={{ borderColor: "#F1E8D0" }}>
                            {/* table header */}
                            <div className="grid grid-cols-3 px-5 py-3 text-xs font-bold uppercase tracking-wide"
                                style={{ backgroundColor: "#FFF4D7", color: "#9a8f7e" }}>
                                <span>Nama</span>
                                <span>Email</span>
                                <span>Bergabung</span>
                            </div>

                            {recentUsers?.length > 0 ? recentUsers.map((user, i) => (
                                <div key={user.id}
                                    className="grid grid-cols-3 items-center border-t px-5 py-3.5 text-sm transition hover:bg-amber-50"
                                    style={{ borderColor: "#F1E8D0" }}>
                                    {/* nama */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                            style={{
                                                backgroundColor: avatarColors[i % avatarColors.length] + "22",
                                                color: avatarColors[i % avatarColors.length],
                                            }}>
                                            {initials(user.name)}
                                        </div>
                                        <span className="font-medium truncate" style={{ color: "#2d1a0e" }}>{user.name}</span>
                                    </div>
                                    {/* email */}
                                    <span className="truncate text-xs" style={{ color: "#9a8f7e" }}>{user.email}</span>
                                    {/* tanggal */}
                                    <span className="text-xs" style={{ color: "#9a8f7e" }}>{fmtDate(user.created_at)}</span>
                                </div>
                            )) : (
                                <div className="px-5 py-12 text-center text-sm" style={{ color: "#9a8f7e" }}>
                                    Belum ada pengguna terdaftar.
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </AdminLayout>
    );
}