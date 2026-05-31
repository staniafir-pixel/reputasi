import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function LessonForm({ module, lesson }) {
    const isEdit = !!lesson;

    const { data, setData, post, put, processing, errors } = useForm({
        title:       lesson?.title       ?? "",
        content:     lesson?.content     ?? "",
        image_url:   lesson?.image_url   ?? "",
        order_index: lesson?.order_index ?? 1,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.modul.lessons.update", [module.id, lesson.id]));
        } else {
            post(route("admin.modul.lessons.store", module.id));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Pelajaran" : "Tambah Pelajaran"}>
            <div className="mx-auto max-w-2xl">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Link href={route("admin.modul.index")} className="font-semibold" style={{ color: "#A13A1E" }}>
                        Modul
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <Link href={route("admin.modul.lessons.index", module.id)} className="font-semibold" style={{ color: "#A13A1E" }}>
                        {module.title}
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <span style={{ color: "#9a8f7e" }}>{isEdit ? "Edit" : "Tambah"} Pelajaran</span>
                </div>

                <h1 className="mb-6 text-xl font-bold" style={{ color: "#542916" }}>
                    {isEdit ? "Edit Pelajaran" : "Tambah Pelajaran"}
                </h1>

                {/* Form Card */}
                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        {/* Title */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Judul Pelajaran <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Contoh: Mengenal Huruf Ha"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.title ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.title}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Konten <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                                placeholder="Tulis isi materi pelajaran di sini..."
                                rows={10}
                                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition focus:border-amber-400 resize-y"
                                style={{ borderColor: errors.content ? "#A13A1E" : "#e8dfc8", color: "#542916", fontFamily: "inherit" }}
                            />
                            <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>
                                {data.content.length} karakter
                            </p>
                            {errors.content && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.content}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                URL Gambar
                            </label>
                            <input
                                type="text"
                                value={data.image_url}
                                onChange={(e) => setData("image_url", e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.image_url ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {data.image_url && (
                                <img
                                    src={data.image_url}
                                    alt="Preview"
                                    className="mt-3 h-36 w-full rounded-xl object-cover"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            )}
                            {errors.image_url && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.image_url}</p>
                            )}
                        </div>

                        {/* Order Index */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Urutan <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={data.order_index}
                                onChange={(e) => setData("order_index", parseInt(e.target.value) || 0)}
                                className="w-32 rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.order_index ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            <p className="mt-1 text-xs" style={{ color: "#9a8f7e" }}>
                                Urutan tampil pelajaran dalam modul.
                            </p>
                            {errors.order_index && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.order_index}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link
                                href={route("admin.modul.lessons.index", module.id)}
                                className="rounded-xl border-2 px-5 py-2.5 text-sm font-semibold"
                                style={{ borderColor: "#e8dfc8", color: "#9a8f7e" }}
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: "#314E2B" }}
                            >
                                {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Pelajaran"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}