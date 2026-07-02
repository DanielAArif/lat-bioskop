import * as movieService from "../services/movieService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const index = async (req, res) => {
    try {
        const result = await movieService.getMovies();

        return successResponse(
            res,
            "Daftar movie",
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
        const result = await movieService.getMovie(
            req.params.id
        );

        return successResponse(
            res,
            "Detail movie",
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
        const result = await movieService.addMovie(
            req.body
        );

        return successResponse(
            res,
            "Movie berhasil ditambahkan",
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

export const update = async (req, res) => {
    try {
        const result = await movieService.editMovie(
            req.params.id,
            req.body
        );

        return successResponse(
            res,
            "Movie berhasil diperbarui",
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
        await movieService.removeMovie(
            req.params.id
        );

        return successResponse(
            res,
            "Movie berhasil dihapus"
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );
    }
};