import * as bookingService from "../services/bookingService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const index = async (req, res) => {
    try {
        const result = await bookingService.getBookings();

        return successResponse(
            res,
            "Daftar booking",
            result
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};

export const myBookings = async (req, res) => {
    try {
        const result = await bookingService.getMyBookings(
            req.user.id_user
        );

        return successResponse(
            res,
            "Daftar booking saya",
            result
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};

export const show = async (req, res) => {
    try {
        const result = await bookingService.getBooking(
            req.params.id,
            req.user
        );

        return successResponse(
            res,
            "Detail booking",
            result
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};

export const store = async (req, res) => {
    try {
        const result = await bookingService.addBooking(
            req.user.id_user,
            req.body
        );

        return successResponse(
            res,
            "Booking berhasil dibuat",
            result,
            201
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};

export const updateStatus = async (req, res) => {
    try {
        const result =
            await bookingService.editBookingStatus(
                req.params.id,
                req.body.status_booking
            );

        return successResponse(
            res,
            "Status booking berhasil diperbarui",
            result
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};

export const cancel = async (req, res) => {

    try {

        const result =
            await bookingService.cancelBooking(
                req.params.id,
                req.user.id_user
            );

        return successResponse(
            res,
            "Booking berhasil dibatalkan",
            result
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );

    }

};

export const destroy = async (req, res) => {
    try {
        await bookingService.removeBooking(
            req.params.id
        );

        return successResponse(
            res,
            "Booking berhasil dihapus"
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};