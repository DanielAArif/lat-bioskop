import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createBooking } from "../../services/bookingService";

function BookingModal({
    isOpen,
    onClose,
    movie
}) {

    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm({
        defaultValues: {
            jumlah_tiket: 1
        }
    });

    if (!isOpen || !movie) return null;

    const jumlah = watch("jumlah_tiket");

    const total =
        Number(jumlah || 0) *
        Number(movie.harga_tiket);

    const onSubmit = async (data) => {

        try {

            await createBooking({
                id_movie: movie.id_movie,
                jumlah_tiket: Number(data.jumlah_tiket)
            });

            toast.success(
                "Booking berhasil"
            );

            reset();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Booking gagal"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

                <h1 className="text-2xl font-bold mb-5">

                    Booking Movie

                </h1>

                <div className="space-y-2 mb-6">

                    <p>

                        <strong>Judul :</strong>

                        {" "}

                        {movie.judul}

                    </p>

                    <p>

                        <strong>Harga :</strong>

                        {" "}

                        Rp{" "}

                        {Number(movie.harga_tiket).toLocaleString("id-ID")}

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>

                        <label>Jumlah Tiket</label>

                        <input
                            type="number"
                            min="1"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("jumlah_tiket")}
                        />

                    </div>

                    <div className="text-xl font-bold text-blue-600">

                        Total :

                        {" "}

                        Rp{" "}

                        {total.toLocaleString("id-ID")}

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-5 py-2 rounded"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Booking
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default BookingModal;