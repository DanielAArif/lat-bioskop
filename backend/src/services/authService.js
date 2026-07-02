import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import {
    getLastUserId,
    findUserByEmail,
    createUser,
    findUserById
} from "../models/userModel.js";

import generateId from "../utils/generateId.js";
import ApiError from "../utils/ApiError.js";

const registerUser = async (data) => {
    const {
        nama,
        email,
        password,
        nomor_telepon
    } = data;

    if (!nama || !email || !password || !nomor_telepon) {
        throw new ApiError("Semua field harus diisi", 400);
    }

    if (!validator.isEmail(email)) {
        throw new ApiError("Format email tidak valid", 400);
    }

    if (password.length < 6) {
        throw new ApiError("Password minimal 6 karakter", 400);
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new ApiError("Email sudah digunakan", 409);
    }

    const lastUser = await getLastUserId();

    const id_user = generateId(
        lastUser?.id_user,
        "U"
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
        id_user,
        nama,
        email,
        password: hashedPassword,
        nomor_telepon,
        role: "customer"
    });

    return {
        id_user,
        nama,
        email,
        nomor_telepon,
        role: "customer"
    };
};

const loginUser = async (data) => {
    const {
        email,
        password
    } = data;

    if (!email || !password) {
        throw new ApiError(
            "Email dan password harus diisi",
            400
        );
    }

    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(
            "Email atau password salah",
            401
        );
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(
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

    return {
        token,
        user: {
            id_user: user.id_user,
            nama: user.nama,
            email: user.email,
            role: user.role
        }
    };
};

const getProfile = async (id_user) => {
    const user = await findUserById(id_user);

    if (!user) {
        throw new ApiError(
            "User tidak ditemukan",
            404
        );
    }

    return user;
};

export {
    registerUser,
    loginUser,
    getProfile
};