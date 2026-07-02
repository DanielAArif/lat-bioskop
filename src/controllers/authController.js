import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import {
    getLastUserId,
    findUserByEmail,
    createUser
} from "../models/userModel.js";

import generateId from "../utils/generateId.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const register = async (req, res) => {
    try {

        const {
            nama,
            email,
            password,
            nomor_telepon
        } = req.body;

        // Validasi input
        if (!nama || !email || !password || !nomor_telepon) {
            return errorResponse(
                res,
                "Semua field harus diisi",
                400
            );
        }

        // Validasi email
        if (!validator.isEmail(email)) {
            return errorResponse(
                res,
                "Format email tidak valid",
                400
            );
        }

        // Password minimal 6 karakter
        if (password.length < 6) {
            return errorResponse(
                res,
                "Password minimal 6 karakter",
                400
            );
        }

        // Cek email
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return errorResponse(
                res,
                "Email sudah digunakan",
                409
            );
        }

        // Ambil ID terakhir
        const lastUser = await getLastUserId();

        const id_user = generateId(
            lastUser?.id_user,
            "U"
        );

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Simpan user
        await createUser({
            id_user,
            nama,
            email,
            password: hashedPassword,
            nomor_telepon,
            role: "customer"
        });

        return successResponse(
            res,
            "Registrasi berhasil",
            {
                id_user,
                nama,
                email,
                nomor_telepon,
                role: "customer"
            },
            201
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Terjadi kesalahan server"
        );

    }
};

export const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return errorResponse(
                res,
                "Email dan password harus diisi",
                400
            );
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return errorResponse(
                res,
                "Email atau password salah",
                401
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return errorResponse(
                res,
                "Email atau password salah",
                401
            );
        }

        const token = jwt.sign(
            {
                id_user: user.id_user,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return successResponse(
            res,
            "Login berhasil",
            {
                token,
                user: {
                    id_user: user.id_user,
                    nama: user.nama,
                    email: user.email,
                    role: user.role
                }
            }
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            "Terjadi kesalahan server"
        );

    }

};