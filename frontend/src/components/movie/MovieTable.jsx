import { Pencil, Trash2 } from "lucide-react";

function MovieTable({ movies, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
                {/* Header: Bersih dengan latar abu-abu sangat muda dan teks abu-abu redup */}
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Judul</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Genre</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Durasi</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Harga</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {movies.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-400">
                                Tidak ada data film ditemukan.
                            </td>
                        </tr>
                    ) : (
                        movies.map((movie) => (
                            <tr key={movie.id_movie} className="hover:bg-gray-50/60 transition-colors">
                                <td className="px-6 py-4 text-sm font-mono text-gray-500 whitespace-nowrap">
                                    {movie.id_movie}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {movie.judul}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {movie.genre}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {movie.durasi} menit
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    Rp {Number(movie.harga_tiket).toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => onEdit(movie)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            Kelola
                                        </button>

                                        <button
                                            onClick={() => onDelete(movie)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MovieTable;