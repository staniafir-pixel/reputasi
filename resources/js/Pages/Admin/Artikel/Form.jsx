import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ArtikelForm({ article, users }) {
    const isEdit = !!article;
    const [tagInput, setTagInput] = useState("");

    const { data, setData, post, put, processing, errors } = useForm({
        title:        article?.title        ?? "",
        content:      article?.content      ?? "",
        thumbnail:    article?.thumbnail    ?? "",
        tags:         article?.tags         ?? [],
        published_at: article?.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : "",
    });

    const addTag = () => {
        const tag = tagInput.trim();
        if (tag && !data.tags.includes(tag)) {
            setData("tags", [...data.tags, tag]);
        }
        setTagInput("");
    };

    const removeTag = (tag) => {
        setData("tags", data.tags.filter((t) => t !== tag));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") { e.preventDefault(); addTag(); }
        if (e.key === "Backspace" && tagInput === "" && data.tags.length > 0) {
            setData("tags", data.tags.slice(0, -1));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.artikel.update", article.id));
        } else {
            post(route("admin.artikel.store"));
        }
    };

    const isPublished = !!data.published_at;

    return (
        <AdminLayout title={isEdit ? "Edit Artikel" : "Tulis Artikel"}>
            <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center gap-3">
                    <Link href={route("admin.artikel.index")} className="text-sm font-semibold" style={{ color: "#A13A1E" }}>
                        ← Kembali
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <h1 className="text-xl font-bold" style={{ color: "#542916" }}>
                        {isEdit ? "Edit Artikel" : "Tulis Artikel"}
                    </h1>

                    {/* Status badge */}
                    <span className="rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                            backgroundColor: isPublished ? "#e8f5e9" : "#FFF4D7",
                            color: isPublished ? "#2e7d32" : "#A13A1E",
                        }}>
                        {isPublished ? "Published" : "Draft"}
                    </span>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    {/* Title */}
                    <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                        <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                            Judul Artikel <span style={{ color: "#A13A1E" }}>*</span>
                        </label>
                        <input type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Judul artikel..."
                            className="w-full rounded-xl border-2 px-4 py-3 text-base font-semibold outline-none transition focus:border-amber-400"
                            style={{ borderColor: errors.title ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                        />
                        {errors.title && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.title}</p>}
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                        <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                            Konten <span style={{ color: "#A13A1E" }}>*</span>
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            placeholder="Tulis isi artikel di sini..."
                            rows={14}
                            className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-y"
                            style={{ borderColor: errors.content ? "#A13A1E" : "#e8dfc8", color: "#542916", fontFamily: "inherit", lineHeight: "1.7" }}
                        />
                        <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>{data.content.length} karakter</p>
                        {errors.content && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.content}</p>}
                    </div>

                    {/* Sidebar info: thumbnail + tags + publish */}
                    <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                        <div className="flex flex-col gap-5">

                            {/* Thumbnail */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                    URL Thumbnail
                                </label>
                                <input type="text"
                                    value={data.thumbnail}
                                    onChange={(e) => setData("thumbnail", e.target.value)}
                                    placeholder="https://..."
                                    className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                    style={{ borderColor: errors.thumbnail ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                                />
                                {data.thumbnail && (
                                    <img src={data.thumbnail} alt="Preview"
                                        className="mt-3 h-32 w-full rounded-xl object-cover"
                                        onError={(e) => e.target.style.display = "none"}
                                    />
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                    Tags
                                </label>
                                <div className="flex min-h-[44px] flex-wrap items-center gap-1.5 rounded-xl border-2 px-3 py-2 transition focus-within:border-amber-400"
                                    style={{ borderColor: "#e8dfc8" }}>
                                    {data.tags.map((tag) => (
                                        <span key={tag}
                                            className="flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold"
                                            style={{ backgroundColor: "#F1C166", color: "#542916" }}>
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)}
                                                className="text-xs leading-none hover:opacity-60">×</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder={data.tags.length === 0 ? "Ketik tag, tekan Enter..." : ""}
                                        className="min-w-[120px] flex-1 bg-transparent text-sm outline-none"
                                        style={{ color: "#542916" }}
                                    />
                                </div>
                                <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>
                                    Ketik lalu tekan Enter untuk menambah tag.
                                </p>
                            </div>

                            {/* Published At */}
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                    Tanggal Publish
                                </label>
                                <input type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData("published_at", e.target.value)}
                                    className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                    style={{ borderColor: "#e8dfc8", color: "#542916" }}
                                />
                                <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>
                                    Kosongkan untuk menyimpan sebagai draft.
                                </p>
                                {errors.published_at && <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.published_at}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Link href={route("admin.artikel.index")}
                            className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                            style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}>
                            Batal
                        </Link>
                        <button type="submit" disabled={processing}
                            className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                            style={{ backgroundColor: "#CF5527" }}>
                            {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Artikel"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
