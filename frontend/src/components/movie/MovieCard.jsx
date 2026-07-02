import { Clock, Tag } from "lucide-react"; // Menggunakan ikon minimalis sebagai pengganti visual

function MovieCard({ movie, onBooking }) {
    return (
        // Card wrapper: Putih bersih, tanpa shadow tebal, menggunakan border halus
        <div className="bg-white rounded border border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between min-h-[220px]">
            
            {/* Bagian Atas: Informasi Konten Film */}
            <div>
                {/* Judul Film: Hitam pekat, tegas */}
                <h2 className="text-base font-semibold text-gray-900 tracking-tight leading-snug line-clamp-2">
                    {movie.judul}
                </h2>

                {/* Metadata Film: Menggunakan layout baris tipis dan ikon abu-abu halus */}
                <div className="mt-3 space-y-1.5 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <Tag size={13} className="text-gray-300" />
                        <span>{movie.genre}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-300" />
                        <span>{movie.durasi} Menit</span>
                    </div>
                </div>
            </div>

            {/* Bagian Bawah: Harga & Tombol Aksi */}
            <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between gap-4">
                {/* Komponen Harga */}
                <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-300">
                        Harga Tiket
                    </span>
                    <span className="text-sm font-semibold text-gray-950">
                        Rp {Number(movie.harga_tiket).toLocaleString("id-ID")}
                    </span>
                </div>

                {/* Tombol Booking: Hitam solid minimalis */}
                <button
                    onClick={() => onBooking(movie)}
                    className="bg-gray-950 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded transition-colors shadow-sm"
                >
                    Tiket
                </button>
            </div>

        </div>
    );
}

export default MovieCard;