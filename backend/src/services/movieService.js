import generateId from "../utils/generateId.js";
import ApiError from "../utils/ApiError.js";

import {
    getLastMovieId,
    getAllMovies,
    findMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from "../models/movieModel.js";

const getMovies = async () => {
    return await getAllMovies();
};

const getMovie = async (id) => {
    const movie = await findMovieById(id);

    if (!movie) {
        throw new ApiError("Movie tidak ditemukan", 404);
    }

    return movie;
};

const addMovie = async (data) => {
    const lastMovie = await getLastMovieId();

    const id_movie = generateId(
        lastMovie?.id_movie,
        "M"
    );

    await createMovie({
        id_movie,
        ...data
    });

    return await findMovieById(id_movie);
};

const editMovie = async (id, data) => {
    const movie = await findMovieById(id);

    if (!movie) {
        throw new ApiError("Movie tidak ditemukan", 404);
    }

    await updateMovie(id, data);

    return await findMovieById(id);
};

const removeMovie = async (id) => {
    const movie = await findMovieById(id);

    if (!movie) {
        throw new ApiError("Movie tidak ditemukan", 404);
    }

    await deleteMovie(id);
};

export {
    getMovies,
    getMovie,
    addMovie,
    editMovie,
    removeMovie
};