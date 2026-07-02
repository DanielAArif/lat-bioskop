import pool from "../config/db.js";

const getLastMovieId = async () => {
    const [rows] = await pool.query(`
        SELECT id_movie
        FROM movies
        ORDER BY id_movie DESC
        LIMIT 1
    `);

    return rows[0] || null;
};

const getAllMovies = async () => {
    const [rows] = await pool.query(`
        SELECT *
        FROM movies
        ORDER BY id_movie
    `);

    return rows;
};

const findMovieById = async (id_movie) => {
    const [rows] = await pool.query(
        `
        SELECT *
        FROM movies
        WHERE id_movie = ?
        `,
        [id_movie]
    );

    return rows[0] || null;
};

const createMovie = async (movie) => {
    const {
        id_movie,
        judul,
        genre,
        durasi,
        rating_usia,
        jadwal_tayang,
        harga_tiket
    } = movie;

    const [result] = await pool.query(
        `
        INSERT INTO movies
        (
            id_movie,
            judul,
            genre,
            durasi,
            rating_usia,
            jadwal_tayang,
            harga_tiket
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            id_movie,
            judul,
            genre,
            durasi,
            rating_usia,
            jadwal_tayang,
            harga_tiket
        ]
    );

    return result;
};

const updateMovie = async (id_movie, movie) => {
    const {
        judul,
        genre,
        durasi,
        rating_usia,
        jadwal_tayang,
        harga_tiket
    } = movie;

    const [result] = await pool.query(
        `
        UPDATE movies
        SET
            judul=?,
            genre=?,
            durasi=?,
            rating_usia=?,
            jadwal_tayang=?,
            harga_tiket=?
        WHERE id_movie=?
        `,
        [
            judul,
            genre,
            durasi,
            rating_usia,
            jadwal_tayang,
            harga_tiket,
            id_movie
        ]
    );

    return result;
};

const deleteMovie = async (id_movie) => {
    const [result] = await pool.query(
        `
        DELETE FROM movies
        WHERE id_movie=?
        `,
        [id_movie]
    );

    return result;
};

export {
    getLastMovieId,
    getAllMovies,
    findMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};