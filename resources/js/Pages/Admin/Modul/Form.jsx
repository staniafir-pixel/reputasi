import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function ModulForm({ module }) {
    const isEdit = !!module;

    const { data, setData, post, put, processing, errors } = useForm({
        title:       module?.title       ?? "",
        description: module?.description ?? "",
        type:        module?.type        ?? "aksara",
        order_index: module?.order_index ?? 0,
        cover_image: module?.cover_image ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.modul.update", module.id));
        } else {
            post(route("admin.modul.store"));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Modul" : "Tambah Modul"}>
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <Link
                        href={route("admin.modul.index")}
                        className="text-sm font-semibold"
                        style={{ color: "#A13A1E" }}
                    >
                        ← Kembali
                    </Link>
                    <span style={{ color: "#e8dfc8" }}>/</span>
                    <h1 className="text-xl font-bold" style={{ color: "#542916" }}>
                        {isEdit ? "Edit Modul" : "Tambah Modul"}
                    </h1>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border p-6" style={{ backgroundColor: "#fff", borderColor: "#e8dfc8" }}>
                    <form onSubmit={submit} className="flex flex-col gap-5">

                        {/* Title */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Judul Modul <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Contoh: Pengenalan Aksara Jawa"
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.title ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Deskripsi singkat tentang modul ini..."
                                rows={3}
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 resize-none"
                                style={{ borderColor: errors.description ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.description}</p>
                            )}
                        </div>

                        {/* Type */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Tipe Modul <span style={{ color: "#A13A1E" }}>*</span>
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: "aksara",     label: "Aksara" },
                                    { value: "cerita",     label: "Cerita" },
                                    { value: "musik_tari", label: "Musik & Tari" },
                                ].map(({ value, label }) => {
                                    const selected = data.type === value;
                                    const colors = {
                                        aksara:     "#314E2B",
                                        cerita:     "#A13A1E",
                                        musik_tari: "#CF5527",
                                    };
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setData("type", value)}
                                            className="flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition"
                                            style={{
                                                backgroundColor: selected ? colors[value] : "#fff",
                                                borderColor: selected ? colors[value] : "#e8dfc8",
                                                color: selected ? "#FEFAF0" : "#9a8f7e",
                                            }}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.type && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.type}</p>
                            )}
                        </div>

                        {/* Order Index */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                Urutan Tampil <span style={{ color: "#A13A1E" }}>*</span>
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
                                Angka lebih kecil tampil lebih dulu.
                            </p>
                            {errors.order_index && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.order_index}</p>
                            )}
                        </div>

                        {/* Cover Image URL */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold" style={{ color: "#542916" }}>
                                URL Cover Image
                            </label>
                            <input
                                type="text"
                                value={data.cover_image}
                                onChange={(e) => setData("cover_image", e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400"
                                style={{ borderColor: errors.cover_image ? "#A13A1E" : "#e8dfc8", color: "#542916" }}
                            />
                            {data.cover_image && (
                                <img
                                    src={data.cover_image}
                                    alt="Preview"
                                    className="mt-3 h-28 w-full rounded-xl object-cover"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            )}
                            {errors.cover_image && (
                                <p className="mt-1 text-xs" style={{ color: "#A13A1E" }}>{errors.cover_image}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link
                                href={route("admin.modul.index")}
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
                                {processing ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Modul"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}