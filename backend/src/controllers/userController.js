import {
    getUsers,
    getUser,
    editUser,
    removeUser
} from "../services/userService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const index = async (req, res) => {
    try {

        const result = await getUsers();

        return successResponse(
            res,
            "Daftar user",
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

        const result = await getUser(
            req.params.id
        );

        return successResponse(
            res,
            "Detail user",
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

export const update = async (req, res) => {
    try {

        const result = await editUser(
            req.params.id,
            req.body
        );

        return successResponse(
            res,
            "User berhasil diperbarui",
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

        await removeUser(
            req.params.id
        );

        return successResponse(
            res,
            "User berhasil dihapus"
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            error.statusCode || 500
        );

    }
};