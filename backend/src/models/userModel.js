import pool from "../config/db.js";

const getLastUserId = async () => {
    const [rows] = await pool.query(`
        SELECT id_user
        FROM users
        ORDER BY id_user DESC
        LIMIT 1
    `);

    return rows[0] || null;
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    return rows[0] || null;
};

const createUser = async (userData) => {
    const {
        id_user,
        nama,
        email,
        password,
        nomor_telepon,
        role
    } = userData;

    const [result] = await pool.query(
        `
        INSERT INTO users
        (
            id_user,
            nama,
            email,
            password,
            nomor_telepon,
            role
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            id_user,
            nama,
            email,
            password,
            nomor_telepon,
            role
        ]
    );

    return result;
};

const findUserById = async (id_user) => {

    const [rows] = await pool.query(
        `
        SELECT
            id_user,
            nama,
            email,
            nomor_telepon,
            role
        FROM users
        WHERE id_user = ?
        `,
        [id_user]
    );

    return rows[0] || null;

};

const getAllUsers = async () => {

    const [rows] = await pool.query(`
        SELECT
            id_user,
            nama,
            email,
            nomor_telepon,
            role
        FROM users
        ORDER BY id_user
    `);

    return rows;

};

const updateUser = async (id_user, data) => {

    const {
        nama,
        email,
        nomor_telepon,
        role
    } = data;

    const [result] = await pool.query(
        `
        UPDATE users
        SET
            nama=?,
            email=?,
            nomor_telepon=?,
            role=?
        WHERE id_user=?
        `,
        [
            nama,
            email,
            nomor_telepon,
            role,
            id_user
        ]
    );

    return result;

};

const deleteUser = async (id_user) => {

    const [result] = await pool.query(
        `
        DELETE FROM users
        WHERE id_user=?
        `,
        [id_user]
    );

    return result;

};

export {
    getLastUserId,
    findUserByEmail,
    createUser,
    findUserById,
    getAllUsers,
    updateUser,
    deleteUser
};