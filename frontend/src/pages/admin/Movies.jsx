import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getMovies,
    deleteMovie
} from "../../services/movieService";

import MovieTable from "../../components/movie/MovieTable";
import MovieModal from "../../components/movie/MovieModal";

function Movies() {

    const [movies, setMovies] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = async () => {

        try {

            const response = await getMovies();

            setMovies(response.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Gagal mengambil data movie"
            );

        }

    };

    useEffect(() => {

        fetchMovies();

    }, []);

    const handleAdd = () => {

        setSelectedMovie(null);

        setIsOpen(true);

    };

    const handleEdit = (movie) => {

        setSelectedMovie(movie);

        setIsOpen(true);

    };

    const handleDelete = async (movie) => {

        if (
            !window.confirm(
                `Hapus movie ${movie.judul}?`
            )
        ) {
            return;
        }

        try {

            await deleteMovie(movie.id_movie);

            toast.success(
                "Movie berhasil dihapus"
            );

            fetchMovies();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Gagal menghapus movie"
            );

        }

    };

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Movies
                </h1>

                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                    Tambah Movie
                </button>

            </div>

            <MovieTable
                movies={movies}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <MovieModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={fetchMovies}
                movie={selectedMovie}
            />

        </div>

    );

}

export default Movies;