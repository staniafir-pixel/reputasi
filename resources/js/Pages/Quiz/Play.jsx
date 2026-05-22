import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { BungaEmas, BungaHijau, BungaMerah, KipasPattern } from "@/Components/BatikIcons";

export default function QuizPlay({ level, questions }) {
    const { props } = usePage();

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null); // { score, correct, total, passed }

    const q = questions?.[current];
    const total = questions?.length || 0;
    const progress = ((current + 1) / total) * 100;
    const answeredCount = Object.keys(answers).length;
    const selectedOption = answers[q?.id] ?? null;

    // kalau page di-reload dan flash sudah ada (edge case)
    useEffect(() => {
        const flash = props.flash || {};
        if (flash.score !== undefined && !result) {
            setResult({
                score: flash.score,
                correct: flash.correct,
                total: flash.total,
                passed: flash.passed,
            });
        }
    }, [props.flash]);

    const selectAnswer = (idx) => {
        if (result) return;
        setAnswers((prev) => ({ ...prev, [q.id]: idx }));
    };

    const next = () => {
        if (current < total - 1) setCurrent((c) => c + 1);
    };

    const prev = () => {
        if (current > 0) setCurrent((c) => c - 1);
    };

    const submit = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        router.post(
            `/quiz/${level.id}/submit`,
            { answers },
            {
                onSuccess: (page) => {
                    const flash = page.props.flash || {};
                    setResult({
                        score: flash.score ?? 0,
                        correct: flash.correct ?? 0,
                        total: flash.total ?? total,
                        passed: flash.passed ?? false,
                    });
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const retry = () => {
        setResult(null);
        setCurrent(0);
        setAnswers({});
        setIsSubmitting(false);
    };

    if (!q) {
        return (
            <MainLayout>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <p style={{ color: "#673C34" }}>Belum ada soal untuk level ini.</p>
                        <button
                            onClick={() => router.visit("/quiz")}
                            className="mt-4 rounded-xl px-6 py-3 text-white"
                            style={{ backgroundColor: "#A13A1E" }}
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* ── Quiz UI ── */}
            <div
                className="min-h-screen px-4 py-8 pt-28"
                style={{ backgroundColor: "#FEFAF0" }}
            >
                <div className="mx-auto max-w-2xl">
                    {/* Top bar */}
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            onClick={() => router.visit("/quiz")}
                            className="rounded-full px-4 py-1.5 text-sm font-semibold transition hover:opacity-70"
                            style={{ color: "#A13A1E", border: "1.5px solid #A13A1E" }}
                        >
                            ← Keluar
                        </button>
                        <span
                            className="text-sm font-semibold"
                            style={{ color: "#542916" }}
                        >
                            {current + 1} / {total}
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div
                        className="mb-8 h-2.5 w-full overflow-hidden rounded-full"
                        style={{ backgroundColor: "#F1C166" }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%`, backgroundColor: "#A13A1E" }}
                        />
                    </div>

                    {/* Question card */}
                    <div
                        className="relative mb-6 overflow-hidden rounded-3xl border-2 p-6"
                        style={{ backgroundColor: "#FFF4D7", borderColor: "#F1C166" }}
                    >
                        {/* watermark */}
                        <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-10">
                            <BungaEmas size={80} />
                        </div>
                        <p
                            className="mb-3 text-xs font-bold uppercase tracking-widest"
                            style={{ color: "#A13A1E" }}
                        >
                            {level.title ?? level.name} — Soal {current + 1}
                        </p>
                        <p
                            className="relative z-10 text-lg font-semibold leading-relaxed"
                            style={{ color: "#542916" }}
                        >
                            {q.question}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="mb-8 flex flex-col gap-3">
                        {q.options?.map((option, idx) => {
                            const isSelected = selectedOption === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => selectAnswer(idx)}
                                    className="flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left text-sm font-medium transition-all hover:shadow-md"
                                    style={{
                                        backgroundColor: isSelected ? "#A13A1E" : "#FFF4D7",
                                        borderColor: isSelected ? "#A13A1E" : "#F1C166",
                                        color: isSelected ? "#fff" : "#542916",
                                    }}
                                >
                                    <span
                                        className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                        style={{
                                            backgroundColor: isSelected
                                                ? "rgba(255,255,255,0.2)"
                                                : "#F1C166",
                                            color: isSelected ? "#fff" : "#542916",
                                        }}
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Answered count hint */}
                    <p
                        className="mb-4 text-center text-xs"
                        style={{ color: "#9a8f7e" }}
                    >
                        {answeredCount} dari {total} soal dijawab
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prev}
                            disabled={current === 0}
                            className="rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all disabled:opacity-30"
                            style={{ borderColor: "#A13A1E", color: "#A13A1E" }}
                        >
                            ← Sebelumnya
                        </button>

                        {current < total - 1 ? (
                            <button
                                onClick={next}
                                disabled={selectedOption === null}
                                className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all disabled:opacity-30"
                                style={{ backgroundColor: "#A13A1E" }}
                            >
                                Selanjutnya →
                            </button>
                        ) : (
                            <button
                                onClick={submit}
                                disabled={answeredCount < total || isSubmitting}
                                className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-40"
                                style={{ backgroundColor: "#314E2B" }}
                            >
                                {isSubmitting ? "Mengirim..." : "Submit Quiz ✓"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Result Modal ── */}
            {result && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(84,41,22,0.6)", backdropFilter: "blur(4px)" }}
                >
                    <div
                        className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
                        style={{ backgroundColor: "#FEFAF0" }}
                    >
                        {/* Header strip */}
                        <div
                            className="relative overflow-hidden px-8 py-10 text-center"
                            style={{
                                backgroundColor: result.passed ? "#314E2B" : "#A13A1E",
                            }}
                        >
                            {/* corner decorations */}
                            <div className="pointer-events-none absolute -top-3 -right-3 opacity-20">
                                <BungaEmas size={80} />
                            </div>
                            <div className="pointer-events-none absolute -bottom-3 -left-3 opacity-15">
                                <KipasPattern size={70} color="#F1C166" />
                            </div>

                            <div className="relative z-10 text-5xl mb-3">
                                {result.passed ? "🏆" : "😔"}
                            </div>
                            <h2
                                className="relative z-10 text-2xl font-bold"
                                style={{ color: "#FEFAF0" }}
                            >
                                {result.passed ? "Selamat!" : "Belum Berhasil"}
                            </h2>
                            <p
                                className="relative z-10 mt-1 text-sm opacity-80"
                                style={{ color: "#FEFAF0" }}
                            >
                                {result.passed
                                    ? "Kamu lulus level ini 🎉"
                                    : "Coba lagi dan kamu pasti bisa!"}
                            </p>
                        </div>

                        {/* Score body */}
                        <div className="px-8 py-6">
                            {/* Big score */}
                            <div className="mb-6 text-center">
                                <span
                                    className="text-6xl font-bold"
                                    style={{ color: result.passed ? "#314E2B" : "#A13A1E" }}
                                >
                                    {result.score}
                                </span>
                                <span
                                    className="text-2xl font-semibold"
                                    style={{ color: "#9a8f7e" }}
                                >
                                    /100
                                </span>
                            </div>

                            {/* Stats row */}
                            <div
                                className="mb-6 flex divide-x rounded-2xl overflow-hidden border"
                                style={{ borderColor: "#e8dfc8", divideColor: "#e8dfc8" }}
                            >
                                <div className="flex-1 py-4 text-center">
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ color: "#314E2B" }}
                                    >
                                        {result.correct}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#9a8f7e" }}>
                                        Benar
                                    </p>
                                </div>
                                <div className="flex-1 py-4 text-center" style={{ borderColor: "#e8dfc8" }}>
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ color: "#A13A1E" }}
                                    >
                                        {result.total - result.correct}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#9a8f7e" }}>
                                        Salah
                                    </p>
                                </div>
                                <div className="flex-1 py-4 text-center" style={{ borderColor: "#e8dfc8" }}>
                                    <p
                                        className="text-2xl font-bold"
                                        style={{ color: "#542916" }}
                                    >
                                        {result.total}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#9a8f7e" }}>
                                        Total Soal
                                    </p>
                                </div>
                            </div>

                            {/* Pass threshold hint */}
                            {!result.passed && (
                                <p
                                    className="mb-5 rounded-xl px-4 py-2.5 text-center text-sm"
                                    style={{
                                        backgroundColor: "#FFF4D7",
                                        color: "#A13A1E",
                                        border: "1px solid #F1C166",
                                    }}
                                >
                                    Nilai minimal lulus adalah 70. Yuk coba lagi! 💪
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={retry}
                                    className="flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition hover:opacity-80"
                                    style={{ borderColor: "#A13A1E", color: "#A13A1E" }}
                                >
                                    Coba Lagi
                                </button>
                                <button
                                    onClick={() => router.visit("/quiz")}
                                    className="flex-1 rounded-xl py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                    style={{ backgroundColor: "#542916" }}
                                >
                                    Kembali ke Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}