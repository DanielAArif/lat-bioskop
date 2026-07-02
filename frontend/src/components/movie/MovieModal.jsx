import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createMovie, updateMovie } from "../../services/movieService";

function MovieModal({ isOpen, onClose, onSuccess, movie }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (movie) {
            reset(movie);
        } else {
            reset({
                judul: "",
                genre: "",
                durasi: "",
                harga_tiket: ""
            });
        }
    }, [movie, reset]);

    const onSubmit = async (data) => {
        try {
            if (movie) {
                await updateMovie(movie.id_movie, data);
                toast.success("Film berhasil diperbarui");
            } else {
                await createMovie(data);
                toast.success("Film baru berhasil ditambahkan");
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Terjadi kesalahan"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-[2px] flex justify-center items-center z-50">
            {/* Box Utama: Minimalis, Border halus, tanpa bayangan warna-warni */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-xl w-full max-w-md p-6 transform transition-all">
                
                {/* Header: Judul bersih & tombol close tipis */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                        {movie ? "Edit Data Film" : "Tambah Film Baru"}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-light"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Input Judul */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            Judul Film
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan judul film"
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
                            {...register("judul", { required: "Judul wajib diisi" })}
                        />
                        {errors.judul && (
                            <span className="text-xs text-red-500 mt-1 block">{errors.judul.message}</span>
                        )}
                    </div>

                    {/* Input Genre */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            Genre
                        </label>
                        <input
                            type="text"
                            placeholder="Contoh: Aksi, Drama, Horor"
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
                            {...register("genre", { required: "Genre wajib diisi" })}
                        />
                        {errors.genre && (
                            <span className="text-xs text-red-500 mt-1 block">{errors.genre.message}</span>
                        )}
                    </div>

                    {/* Input Durasi */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            Durasi (Menit)
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
                            {...register("durasi", { 
                                required: "Durasi wajib diisi",
                                min: { value: 1, message: "Durasi minimal 1 menit" }
                            })}
                        />
                        {errors.durasi && (
                            <span className="text-xs text-red-500 mt-1 block">{errors.durasi.message}</span>
                        )}
                    </div>

                    {/* Input Harga Tiket */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            Harga Tiket (IDR)
                        </label>
                        <input
                            type="number"
                            placeholder="Rp 0"
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
                            {...register("harga_tiket", { 
                                required: "Harga tiket wajib diisi",
                                min: { value: 1, message: "Harga tidak boleh kosong" }
                            })}
                        />
                        {errors.harga_tiket && (
                            <span className="text-xs text-red-500 mt-1 block">{errors.harga_tiket.message}</span>
                        )}
                    </div>

                    {/* Footer Tombol Aksi */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm"
                        >
                            {movie ? "Perbarui" : "Simpan Film"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieModal;