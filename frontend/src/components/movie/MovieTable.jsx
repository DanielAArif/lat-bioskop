import { Pencil, Trash2 } from "lucide-react";

function MovieTable({ movies, onEdit, onDelete }) {

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-800 text-white">

                    <tr>

                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Judul</th>
                        <th className="p-3 text-left">Genre</th>
                        <th className="p-3 text-left">Durasi</th>
                        <th className="p-3 text-left">Harga</th>
                        <th className="p-3 text-center">Aksi</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        movies.map((movie) => (

                            <tr
                                key={movie.id_movie}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {movie.id_movie}
                                </td>

                                <td className="p-3">
                                    {movie.judul}
                                </td>

                                <td className="p-3">
                                    {movie.genre}
                                </td>

                                <td className="p-3">
                                    {movie.durasi} menit
                                </td>

                                <td className="p-3">
                                    Rp {Number(movie.harga_tiket).toLocaleString("id-ID")}
                                </td>

                                <td className="p-3">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onEdit(movie)}
                                            className="bg-yellow-500 text-white p-2 rounded"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(movie)}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default MovieTable;