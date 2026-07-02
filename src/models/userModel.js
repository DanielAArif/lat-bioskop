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

export {
    getLastUserId,
    findUserByEmail,
    createUser
};