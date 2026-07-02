import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
    createMovie,
    updateMovie
} from "../../services/movieService";

function MovieModal({
    isOpen,
    onClose,
    onSuccess,
    movie
}) {

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

                await updateMovie(
                    movie.id_movie,
                    data
                );

                toast.success(
                    "Movie berhasil diperbarui"
                );

            } else {

                await createMovie(data);

                toast.success(
                    "Movie berhasil ditambahkan"
                );

            }

            onSuccess();
            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Terjadi kesalahan"
            );

        }

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6">

                    {
                        movie
                            ? "Edit Movie"
                            : "Tambah Movie"
                    }

                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

                        <label>Judul</label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("judul", {
                                required: "Judul wajib diisi"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.judul?.message}
                        </small>

                    </div>

                    <div>

                        <label>Genre</label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("genre", {
                                required: "Genre wajib diisi"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.genre?.message}
                        </small>

                    </div>

                    <div>

                        <label>Durasi (Menit)</label>

                        <input
                            type="number"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("durasi", {
                                required: "Durasi wajib diisi",
                                min: 1
                            })}
                        />

                    </div>

                    <div>

                        <label>Harga Tiket</label>

                        <input
                            type="number"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("harga_tiket", {
                                required: "Harga tiket wajib diisi",
                                min: 1
                            })}
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded bg-gray-400 text-white"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded bg-blue-600 text-white"
                        >
                            {
                                movie
                                    ? "Update"
                                    : "Simpan"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default MovieModal;