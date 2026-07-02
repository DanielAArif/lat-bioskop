import pool from "../config/db.js";

const getLastBookingId = async () => {
    const [rows] = await pool.query(`
        SELECT id_booking
        FROM bookings
        ORDER BY id_booking DESC
        LIMIT 1
    `);

    return rows[0] || null;
};

const getAllBookings = async () => {
    const [rows] = await pool.query(`
        SELECT
            b.id_booking,
            b.tanggal_booking,
            b.jumlah_tiket,
            b.total_harga,
            b.status_booking,

            u.id_user,
            u.nama,

            m.id_movie,
            m.judul

        FROM bookings b

        JOIN users u
            ON b.id_user = u.id_user

        JOIN movies m
            ON b.id_movie = m.id_movie

        ORDER BY b.tanggal_booking DESC
    `);

    return rows;
};

const getBookingsByUser = async (id_user) => {
    const [rows] = await pool.query(
        `
        SELECT
            b.id_booking,
            b.tanggal_booking,
            b.jumlah_tiket,
            b.total_harga,
            b.status_booking,

            m.id_movie,
            m.judul,
            m.genre,
            m.jadwal_tayang

        FROM bookings b

        JOIN movies m
            ON b.id_movie = m.id_movie

        WHERE b.id_user = ?

        ORDER BY b.tanggal_booking DESC
        `,
        [id_user]
    );

    return rows;
};

const findBookingById = async (id_booking) => {
    const [rows] = await pool.query(
        `
        SELECT *
        FROM bookings
        WHERE id_booking = ?
        `,
        [id_booking]
    );

    return rows[0] || null;
};

const createBooking = async (booking) => {

    const {
        id_booking,
        id_user,
        id_movie,
        jumlah_tiket,
        total_harga,
        status_booking
    } = booking;

    const [result] = await pool.query(
        `
        INSERT INTO bookings
        (
            id_booking,
            id_user,
            id_movie,
            jumlah_tiket,
            total_harga,
            status_booking
        )

        VALUES
        (?, ?, ?, ?, ?, ?)
        `,
        [
            id_booking,
            id_user,
            id_movie,
            jumlah_tiket,
            total_harga,
            status_booking
        ]
    );

    return result;
};

const updateBookingStatus = async (
    id_booking,
    status_booking
) => {

    const [result] = await pool.query(
        `
        UPDATE bookings
        SET status_booking = ?
        WHERE id_booking = ?
        `,
        [
            status_booking,
            id_booking
        ]
    );

    return result;
};

const deleteBooking = async (id_booking) => {

    const [result] = await pool.query(
        `
        DELETE FROM bookings
        WHERE id_booking = ?
        `,
        [id_booking]
    );

    return result;
};

export {
    getLastBookingId,
    getAllBookings,
    getBookingsByUser,
    findBookingById,
    createBooking,
    updateBookingStatus,
    deleteBooking
};