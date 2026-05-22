import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import {
    BungaEmas,
    BungaHijau,
    BungaMerah,
    KipasPattern,
    GridBatik,
    AwnCloud,
} from "@/Components/BatikIcons";

export default function QuizIndex({ auth, levels = [], passedLevels = [] }) {
    const totalLevels = levels.length;
    const passedCount = passedLevels.length;
    const progressPct = totalLevels > 0 ? Math.round((passedCount / totalLevels) * 100) : 0;

    function getLevelState(level) {
        if (passedLevels.includes(level.id)) return "passed";
        // unlocked if it's the first, or previous level is passed
        const idx = levels.findIndex((l) => l.id === level.id);
        if (idx === 0) return "unlocked";
        const prevId = levels[idx - 1]?.id;
        if (passedLevels.includes(prevId)) return "unlocked";
        return "locked";
    }

    return (
        <MainLayout auth={auth}>
            <Head title="Quiz" />

            {/* ── Page Header ── */}
            <section
                className="relative overflow-hidden pt-32 pb-20"
                style={{ backgroundColor: "#542916" }}
            >
                {/* top-right decorations */}
                <div className="pointer-events-none absolute -top-4 -right-4 opacity-20">
                    <BungaHijau size={120} />
                </div>
                <div className="pointer-events-none absolute top-8 right-16 opacity-15">
                    <KipasPattern size={80} color="#F1C166" />
                </div>
                <div className="pointer-events-none absolute top-2 right-28 opacity-25">
                    <BungaEmas size={60} />
                </div>

                {/* bottom-left decorations */}
                <div className="pointer-events-none absolute -bottom-4 -left-4 opacity-20">
                    <KipasPattern size={100} color="#F1C166" />
                </div>
                <div className="pointer-events-none absolute bottom-6 left-16 opacity-15">
                    <BungaMerah size={70} />
                </div>
                <div className="pointer-events-none absolute bottom-2 left-28 opacity-10">
                    <GridBatik size={60} />
                </div>
                <div className="pointer-events-none absolute bottom-8 left-40 opacity-20">
                    <AwnCloud size={50} />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                    <span
                        className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold"
                        style={{ backgroundColor: "#F1C166", color: "#542916" }}
                    >
                        Uji Pengetahuan
                    </span>
                    <h1
                        className="font-serif text-4xl font-bold leading-tight md:text-5xl"
                        style={{ color: "#FEFAF0" }}
                    >
                        Quiz Nusantara
                    </h1>
                    <p className="mt-3 text-lg opacity-80" style={{ color: "#FEFAF0" }}>
                        Seberapa dalam kamu mengenal budaya Indonesia?
                    </p>

                    {/* Progress bar */}
                    <div className="mx-auto mt-8 max-w-sm">
                        <div className="mb-2 flex justify-between text-sm" style={{ color: "#F1C166" }}>
                            <span>{passedCount} dari {totalLevels} level selesai</span>
                            <span>{progressPct}%</span>
                        </div>
                        <div
                            className="h-3 w-full overflow-hidden rounded-full"
                            style={{ backgroundColor: "rgba(254,250,240,0.2)" }}
                        >
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${progressPct}%`,
                                    backgroundColor: "#F1C166",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Levels Grid ── */}
            <section className="min-h-screen px-6 py-16" style={{ backgroundColor: "#FEFAF0" }}>
                <div className="mx-auto max-w-5xl">

                    {totalLevels === 0 ? (
                        <div className="py-24 text-center">
                            <BungaEmas size={64} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg" style={{ color: "#542916" }}>
                                Belum ada level tersedia.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {levels.map((level, idx) => {
                                const state = getLevelState(level);
                                return (
                                    <LevelCard
                                        key={level.id}
                                        level={level}
                                        index={idx}
                                        state={state}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}

/* ── extracted to avoid const-inside-map ── */
function LevelCard({ level, index, state }) {
    const isPassed = state === "passed";
    const isLocked = state === "locked";
    const isUnlocked = state === "unlocked";

    const cardStyle = isPassed
        ? { backgroundColor: "#314E2B", borderColor: "#314E2B" }
        : isUnlocked
        ? { backgroundColor: "#fff", borderColor: "#F1C166" }
        : { backgroundColor: "#f5f0e8", borderColor: "#d4c9b8" };

    const numberBgStyle = isPassed
        ? { backgroundColor: "rgba(255,255,255,0.15)", color: "#FEFAF0" }
        : isUnlocked
        ? { backgroundColor: "#F1C166", color: "#542916" }
        : { backgroundColor: "#e8e0d0", color: "#9a8f7e" };

    const titleStyle = isPassed
        ? { color: "#FEFAF0" }
        : isLocked
        ? { color: "#9a8f7e" }
        : { color: "#542916" };

    const descStyle = isPassed
        ? { color: "rgba(254,250,240,0.7)" }
        : { color: "#7a6a5a" };

    const cardContent = (
        <div
            className="group relative flex flex-col overflow-hidden rounded-2xl border-2 p-6 shadow-sm transition-all duration-300"
            style={{
                ...cardStyle,
                ...(isLocked ? { opacity: 0.65 } : {}),
            }}
        >
            {/* Watermark batik on unlocked/passed */}
            {!isLocked && (
                <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-10">
                    <BungaEmas size={90} />
                </div>
            )}

            {/* Level number badge */}
            <div className="mb-4 flex items-start justify-between">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                    style={numberBgStyle}
                >
                    {index + 1}
                </div>

                {/* Status icon */}
                {isPassed && (
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                        style={{ backgroundColor: "#F1C166", color: "#314E2B" }}
                    >
                        ✓
                    </div>
                )}
                {isLocked && (
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                        style={{ backgroundColor: "#e8e0d0", color: "#9a8f7e" }}
                    >
                        🔒
                    </div>
                )}
            </div>

            {/* Title */}
            <h3
                className="relative z-10 mb-1 text-lg font-bold"
                style={titleStyle}
            >
                {level.name ?? `Level ${index + 1}`}
            </h3>

            {/* Description / question count */}
            <p className="relative z-10 mb-5 text-sm" style={descStyle}>
                {level.description ?? (
                    level.questions_count
                        ? `${level.questions_count} pertanyaan`
                        : "Uji kemampuanmu"
                )}
            </p>

            {/* CTA */}
            <div className="relative z-10 mt-auto">
                {isPassed && (
                    <span
                        className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FEFAF0" }}
                    >
                        <span>✓</span> Selesai
                    </span>
                )}
                {isUnlocked && (
                    <span
                        className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors group-hover:opacity-90"
                        style={{ backgroundColor: "#542916", color: "#FEFAF0" }}
                    >
                        Mulai Quiz →
                    </span>
                )}
                {isLocked && (
                    <span
                        className="inline-flex items-center gap-1 text-sm"
                        style={{ color: "#9a8f7e" }}
                    >
                        🔒 Selesaikan level sebelumnya
                    </span>
                )}
            </div>
        </div>
    );

    if (isLocked) {
        return <div className="cursor-not-allowed">{cardContent}</div>;
    }

    return (
        <Link
            href={`/quiz/${level.id}`}
            className="block transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
            {cardContent}
        </Link>
    );
}