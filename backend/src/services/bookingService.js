import {
    getLastBookingId,
    getAllBookings,
    getBookingsByUser,
    findBookingById,
    createBooking,
    updateBookingStatus,
    deleteBooking
} from "../models/bookingModel.js";

import { findMovieById } from "../models/movieModel.js";

import generateId from "../utils/generateId.js";
import ApiError from "../utils/ApiError.js";

const getBookings = async () => {
    return await getAllBookings();
};

const getMyBookings = async (id_user) => {
    return await getBookingsByUser(id_user);
};

const getBooking = async (id_booking, user) => {
    const booking = await findBookingById(id_booking);

    if (!booking) {
        throw new ApiError("Booking tidak ditemukan", 404);
    }

    if (
        user.role === "customer" &&
        booking.id_user !== user.id_user
    ) {
        throw new ApiError(
            "Anda tidak memiliki akses ke booking ini",
            403
        );
    }

    return booking;
};

const addBooking = async (id_user, data) => {
    const {
        id_movie,
        jumlah_tiket
    } = data;

    if (!id_movie || !jumlah_tiket) {
        throw new ApiError(
            "Semua field harus diisi",
            400
        );
    }

    if (jumlah_tiket < 1) {
        throw new ApiError(
            "Jumlah tiket minimal 1",
            400
        );
    }

    const movie = await findMovieById(id_movie);

    if (!movie) {
        throw new ApiError(
            "Movie tidak ditemukan",
            404
        );
    }

    const lastBooking = await getLastBookingId();

    const id_booking = generateId(
        lastBooking?.id_booking,
        "B"
    );

    const total_harga =
        movie.harga_tiket * jumlah_tiket;

    await createBooking({
        id_booking,
        id_user,
        id_movie,
        jumlah_tiket,
        total_harga,
        status_booking: "pending"
    });

    return await findBookingById(id_booking);
};

const editBookingStatus = async (
    id_booking,
    status_booking
) => {

    const booking = await findBookingById(id_booking);

    if (!booking) {
        throw new ApiError(
            "Booking tidak ditemukan",
            404
        );
    }

    const statusValid = [
        "pending",
        "sukses",
        "dibatalkan"
    ];

    if (!statusValid.includes(status_booking)) {
        throw new ApiError(
            "Status booking tidak valid",
            400
        );
    }

    await updateBookingStatus(
        id_booking,
        status_booking
    );

    return await findBookingById(id_booking);
};

const cancelBooking = async (
    id_booking,
    id_user
) => {

    const booking = await findBookingById(id_booking);

    if (!booking) {
        throw new ApiError(
            "Booking tidak ditemukan",
            404
        );
    }

    if (booking.id_user !== id_user) {
        throw new ApiError(
            "Anda tidak memiliki akses ke booking ini",
            403
        );
    }

    if (booking.status_booking !== "pending") {
        throw new ApiError(
            "Hanya booking dengan status pending yang dapat dibatalkan",
            400
        );
    }

    await updateBookingStatus(
        id_booking,
        "dibatalkan"
    );

    return await findBookingById(id_booking);
};

const removeBooking = async (id_booking) => {

    const booking = await findBookingById(id_booking);

    if (!booking) {
        throw new ApiError(
            "Booking tidak ditemukan",
            404
        );
    }

    await deleteBooking(id_booking);

    return null;
};

export {
    getBookings,
    getMyBookings,
    getBooking,
    addBooking,
    editBookingStatus,
    cancelBooking,
    removeBooking
};