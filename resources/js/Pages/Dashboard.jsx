import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { BungaEmas, KipasPattern, GridBatik } from "@/Components/BatikIcons";

// ── inline SVG icons ──────────────────────────────────────────────────────────
const IconBook = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
);
const IconMap = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/>
        <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
);
const IconQuiz = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);
const IconArticle = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
    </svg>
);

const MODULE_COLORS = {
    aksara:     "#314E2B",
    cerita:     "#A13A1E",
    musik_tari: "#CF5527",
};
const MODULE_LABELS = {
    aksara:     "AK",
    cerita:     "CR",
    musik_tari: "MT",
};

const QUICK_LINKS = [
    { Icon: IconBook,    label: "Kamus",       href: "/kamus",   color: "#542916" },
    { Icon: IconMap,     label: "Peta Budaya", href: "/peta",    color: "#314E2B" },
    { Icon: IconQuiz,    label: "Quiz",        href: "/quiz",    color: "#A13A1E" },
    { Icon: IconArticle, label: "Artikel",     href: "/artikel", color: "#CF5527" },
];

function parseTags(tags) {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
        try { return JSON.parse(tags); } catch { return []; }
    }
    return [];
}

export default function Dashboard({ auth, modules, latestArticles, streakCount, progress }) {
    const getProgress = (moduleId) => {
        const completed = progress?.[moduleId] ?? 0;
        const total = modules?.find((m) => m.id === moduleId)?.lessons_count ?? 1;
        return Math.round((completed / total) * 100);
    };

    return (
        <MainLayout auth={auth}>
            <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#FEFAF0" }}>
                <div className="mx-auto max-w-5xl px-6">

                    {/* ── Welcome Banner ── */}
                    <div className="relative mb-10 overflow-hidden rounded-3xl px-8 py-8"
                        style={{ backgroundColor: "#314E2B" }}>
                        <div className="pointer-events-none absolute -top-4 -right-4 opacity-15">
                            <BungaEmas size={110} />
                        </div>
                        <div className="pointer-events-none absolute top-4 right-20 opacity-10">
                            <KipasPattern size={70} color="#F1C166" />
                        </div>
                        <div className="pointer-events-none absolute -bottom-4 -left-4 opacity-10">
                            <GridBatik size={80} />
                        </div>

                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
                            <div>
                                <h1 className="mb-1 text-2xl font-bold leading-snug" style={{ color: "#FEFAF0" }}>
                                    Selamat Belajar, {auth?.user?.name?.split(" ")[0] ?? "Pelajar"}!
                                </h1>
                                <p className="text-sm opacity-70" style={{ color: "#FEFAF0" }}>
                                    Terus lestarikan budaya Nusantara
                                </p>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl px-5 py-3"
                                style={{ backgroundColor: "#F1C166" }}>
                                <span className="text-2xl">🔥</span>
                                <div>
                                    <p className="text-lg font-bold leading-none" style={{ color: "#314E2B" }}>
                                        {streakCount ?? 0} Hari
                                    </p>
                                    <p className="mt-0.5 text-xs font-medium" style={{ color: "#542916" }}>
                                        Streak aktif
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Quick Access ── */}
                    <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {QUICK_LINKS.map(({ Icon, label, href, color }) => (
                            <Link key={href} href={href}
                                className="group flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                                style={{ backgroundColor: "#fff", borderColor: "#F1C166" }}>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{ backgroundColor: "#FFF4D7", color }}>
                                    <Icon />
                                </div>
                                <span className="text-sm font-semibold" style={{ color: "#542916" }}>{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* ── Modul Pembelajaran ── */}
                    <section className="mb-10">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold" style={{ color: "#542916" }}>Modul Pembelajaran</h2>
                            <Link href="/modul" className="text-sm font-semibold transition hover:opacity-70"
                                style={{ color: "#A13A1E" }}>
                                Lihat semua →
                            </Link>
                        </div>

                        {modules?.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {modules.map((module) => {
                                    const prog = getProgress(module.id);
                                    const color = MODULE_COLORS[module.type] ?? "#542916";
                                    const label = MODULE_LABELS[module.type] ?? "M";
                                    return (
                                        <Link key={module.id} href={`/modul/${module.id}`}
                                            className="group relative overflow-hidden rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                                            style={{ backgroundColor: "#fff", borderColor: "#F1C166" }}>
                                            <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.07]">
                                                <BungaEmas size={80} />
                                            </div>
                                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold"
                                                style={{ backgroundColor: color, color: "#FEFAF0" }}>
                                                {label}
                                            </div>
                                            <h3 className="relative z-10 mb-1 font-bold leading-snug" style={{ color: "#542916" }}>
                                                {module.title}
                                            </h3>
                                            <p className="relative z-10 mb-4 text-xs" style={{ color: "#9a8f7e" }}>
                                                {module.lessons_count} pelajaran
                                            </p>
                                            <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#F1E8D0" }}>
                                                <div className="h-full rounded-full transition-all duration-700"
                                                    style={{ width: `${prog}%`, backgroundColor: color }} />
                                            </div>
                                            <p className="relative z-10 mt-1.5 text-xs font-medium" style={{ color: "#9a8f7e" }}>
                                                {prog}% selesai
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm" style={{ color: "#9a8f7e" }}>Belum ada modul tersedia.</p>
                        )}
                    </section>

                    {/* ── Artikel Terbaru ── */}
                    <section>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold" style={{ color: "#542916" }}>Artikel Terbaru</h2>
                            <Link href="/artikel" className="text-sm font-semibold transition hover:opacity-70"
                                style={{ color: "#A13A1E" }}>
                                Lihat semua →
                            </Link>
                        </div>

                        {latestArticles?.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {latestArticles.map((article) => {
                                    const tags = parseTags(article.tags);
                                    return (
                                        <Link key={article.id} href={`/artikel/${article.id}`}
                                            className="group relative overflow-hidden rounded-2xl border-2 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                                            style={{ backgroundColor: "#fff", borderColor: "#F1C166" }}>
                                            <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-[0.07]">
                                                <BungaEmas size={80} />
                                            </div>

                                            {tags.length > 0 && (
                                                <div className="relative z-10 mb-3 flex flex-wrap gap-1.5">
                                                    {tags.slice(0, 2).map((tag) => (
                                                        <span key={tag}
                                                            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                                            style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <h3 className="relative z-10 mb-2 text-sm font-bold leading-snug"
                                                style={{ color: "#542916" }}>
                                                {article.title}
                                            </h3>
                                            <p className="relative z-10 text-xs" style={{ color: "#9a8f7e" }}>
                                                oleh {article.author?.name}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 py-12 text-center"
                                style={{ borderColor: "#F1E8D0", backgroundColor: "#fff" }}>
                                <div className="mb-3 opacity-20"><BungaEmas size={56} /></div>
                                <p className="text-sm font-medium" style={{ color: "#9a8f7e" }}>
                                    Belum ada artikel tersedia.
                                </p>
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </MainLayout>
    );
}