import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createBooking } from "../../services/bookingService";

function BookingModal({ isOpen, onClose, movie }) {
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
    const total = Number(jumlah || 0) * Number(movie.harga_tiket);

    const onSubmit = async (data) => {
        try {
            await createBooking({
                id_movie: movie.id_movie,
                jumlah_tiket: Number(data.jumlah_tiket)
            });
            toast.success("Booking tiket berhasil diproses");
            reset();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Gagal melakukan booking"
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-[2px] flex justify-center items-center z-50">
            {/* Box Utama: Berlatar putih bersih dengan radius sudut minimalis */}
            <div className="bg-white rounded border border-gray-100 shadow-xl w-full max-w-md p-6 transform transition-all">
                
                {/* Header Modal */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                        Konfirmasi Booking
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-light"
                    >
                        &times;
                    </button>
                </div>

                {/* Ringkasan Data Film dengan Style List Garis Tipis */}
                <div className="divide-y divide-gray-100 border-t border-b border-gray-100 py-1 my-5 text-sm">
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">Judul Film</span>
                        <span className="font-medium text-gray-900 max-w-[240px] text-right truncate">
                            {movie.judul}
                        </span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">Harga Satuan</span>
                        <span className="text-gray-600 font-medium">
                            Rp {Number(movie.harga_tiket).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>

                {/* Form Input & Total Kalkulasi */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            Jumlah Tiket
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                            {...register("jumlah_tiket", { required: true, min: 1 })}
                        />
                    </div>

                    {/* Tampilan Total Harga: Bersih, Bold Hitam Solid */}
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Total Bayar
                        </span>
                        <span className="text-lg font-bold text-gray-950">
                            Rp {total.toLocaleString("id-ID")}
                        </span>
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
                            className="bg-gray-950 hover:bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm"
                        >
                            Beli Tiket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingModal;