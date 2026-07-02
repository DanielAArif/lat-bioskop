import validator from "validator";

import {
    getAllUsers,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
} from "../models/userModel.js";

import ApiError from "../utils/ApiError.js";

const getUsers = async () => {
    return await getAllUsers();
};

const getUser = async (id_user) => {
    const user = await findUserById(id_user);

    if (!user) {
        throw new ApiError("User tidak ditemukan", 404);
    }

    return user;
};

const editUser = async (id_user, data) => {
    const user = await findUserById(id_user);

    if (!user) {
        throw new ApiError("User tidak ditemukan", 404);
    }

    const {
        nama,
        email,
        nomor_telepon,
        role
    } = data;

    if (!nama || !email || !nomor_telepon || !role) {
        throw new ApiError("Semua field harus diisi", 400);
    }

    if (!validator.isEmail(email)) {
        throw new ApiError("Format email tidak valid", 400);
    }

    const existingUser = await findUserByEmail(email);

    if (
        existingUser &&
        existingUser.id_user !== id_user
    ) {
        throw new ApiError("Email sudah digunakan", 409);
    }

    await updateUser(id_user, {
        nama,
        email,
        nomor_telepon,
        role
    });

    return await findUserById(id_user);
};

const removeUser = async (id_user) => {
    const user = await findUserById(id_user);

    if (!user) {
        throw new ApiError("User tidak ditemukan", 404);
    }

    await deleteUser(id_user);

    return null;
};

export {
    getUsers,
    getUser,
    editUser,
    removeUser
};