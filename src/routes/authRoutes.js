/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication API
 */

import express from "express";

import {
    register,
    login
} from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - email
 *               - password
 *               - nomor_telepon
 *             properties:
 *               nama:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nomor_telepon:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 */
router.post("/login", login);

export default router;