function MovieCard({ movie, onBooking }) {

    return (

        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

            <div className="h-60 bg-slate-200 flex items-center justify-center">

                <span className="text-gray-500">
                    Poster
                </span>

            </div>

            <div className="p-5">

                <h2 className="text-xl font-bold">
                    {movie.judul}
                </h2>

                <p className="text-gray-500 mt-2">
                    Genre : {movie.genre}
                </p>

                <p className="text-gray-500">
                    Durasi : {movie.durasi} menit
                </p>

                <p className="text-blue-600 font-bold text-lg mt-3">
                    Rp{" "}
                    {Number(movie.harga_tiket).toLocaleString("id-ID")}
                </p>

                <button
                    onClick={() => onBooking(movie)}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                    Booking
                </button>

            </div>

        </div>

    );

}

export default MovieCard;