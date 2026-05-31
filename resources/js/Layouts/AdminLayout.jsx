import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        routeName: "admin.dashboard",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: "Modul",
        href: "/admin/modul",
        routeName: "admin.modul.index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        label: "Quiz",
        href: "/admin/quiz",
        routeName: "admin.quiz.index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
    {
        label: "Kosakata",
        href: "/admin/kosakata",
        routeName: "admin.kosakata.index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        label: "Artikel",
        href: "/admin/artikel",
        routeName: "admin.artikel.index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        label: "Pengguna",
        href: "/admin/pengguna",
        routeName: "admin.pengguna.index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
];

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (item) => {
        // match by route name jika tersedia
        try {
            return route().current(item.routeName) ||
                route().current(item.routeName + ".*");
        } catch {
            return url.startsWith(item.href);
        }
    };

    const logout = () => {
        router.post("/logout");
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FEFAF0" }}>

            {/* ── Sidebar ── */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ backgroundColor: "#2d1a0e" }}
            >
                {/* Logo */}
                <div className="flex h-16 items-center gap-2.5 border-b px-5" style={{ borderColor: "#3d2a1e" }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ backgroundColor: "#F1C166", color: "#2d1a0e" }}>
                        N
                    </div>
                    <div>
                        <p className="text-sm font-bold" style={{ color: "#FEFAF0" }}>Nusantara</p>
                        <p className="text-xs" style={{ color: "#9a7a6a" }}>Admin Panel</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#6b4c3b" }}>
                        Menu
                    </p>
                    <div className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                                    style={{
                                        backgroundColor: active ? "#F1C166" : "transparent",
                                        color: active ? "#2d1a0e" : "#c8a99a",
                                    }}
                                >
                                    <span style={{ color: active ? "#2d1a0e" : "#9a7a6a" }}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom: user + logout */}
                <div className="border-t px-4 py-4" style={{ borderColor: "#3d2a1e" }}>
                    <div className="mb-3 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{ backgroundColor: "#A13A1E", color: "#FEFAF0" }}>
                            {props.auth?.user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold" style={{ color: "#FEFAF0" }}>
                                {props.auth?.user?.name ?? "Admin"}
                            </p>
                            <p className="truncate text-xs" style={{ color: "#9a7a6a" }}>
                                {props.auth?.user?.email ?? ""}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full rounded-xl py-2 text-xs font-semibold transition hover:opacity-80"
                        style={{ backgroundColor: "#3d2a1e", color: "#c8a99a" }}
                    >
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Main Content ── */}
            <div className="flex min-h-screen flex-col" style={{ marginLeft: "240px" }}>

                {/* Top bar */}
                <header
                    className="sticky top-0 z-20 flex h-16 items-center justify-between border-b px-6"
                    style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}
                >
                    {/* spacer biar title tetap center */}
                    <div style={{ width: "22px" }} />

                    {/* Page title */}
                    <h1 className="text-base font-bold" style={{ color: "#542916" }}>
                        {title ?? "Admin"}
                    </h1>

                    {/* Back to site */}
                    <Link
                        href="/dashboard"
                        className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition hover:opacity-70"
                        style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}
                    >
                        Lihat Situs
                    </Link>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}