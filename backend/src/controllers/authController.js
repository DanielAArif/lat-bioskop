import {
    registerUser,
    loginUser,
    getProfile
} from "../services/authService.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        return successResponse(
            res,
            "Registrasi berhasil",
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

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        return successResponse(
            res,
            "Login berhasil",
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

export const profile = async (req, res) => {
    try {
        const result = await getProfile(
            req.user.id_user
        );

        return successResponse(
            res,
            "Data profile",
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