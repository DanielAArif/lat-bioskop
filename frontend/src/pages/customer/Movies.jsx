import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMovies } from "../../services/movieService";

import MovieCard from "../../components/movie/MovieCard";
import BookingModal from "../../components/booking/BookingModal";

function Movies() {

    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const fetchMovies = async () => {

        try {

            const response = await getMovies();

            setMovies(response.data);

        } catch (error) {

            toast.error(
                "Gagal mengambil data movie"
            );

        }

    };

    useEffect(() => {

        fetchMovies();

    }, []);

    const handleBooking = (movie) => {

        setSelectedMovie(movie);

        setIsOpen(true);

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                Daftar Film

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    movies.map((movie) => (

                        <MovieCard
                            key={movie.id_movie}
                            movie={movie}
                            onBooking={handleBooking}
                        />

                    ))
                }

            </div>

            <BookingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                movie={selectedMovie}
            />

        </div>

    );

}

export default Movies;