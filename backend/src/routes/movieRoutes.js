import express from "express";

import * as movieController from "../controllers/movieController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movie Management
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Mendapatkan semua movie
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Daftar movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/", movieController.index);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Detail movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: M001
 *     responses:
 *       200:
 *         description: Detail movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie tidak ditemukan
 */
router.get("/:id", movieController.show);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Menambahkan movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMovieRequest'
 *     responses:
 *       201:
 *         description: Movie berhasil ditambahkan
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    movieController.store
);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Memperbarui movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: M001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMovieRequest'
 *     responses:
 *       200:
 *         description: Movie berhasil diperbarui
 *       404:
 *         description: Movie tidak ditemukan
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    movieController.update
);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Menghapus movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: M001
 *     responses:
 *       200:
 *         description: Movie berhasil dihapus
 *       404:
 *         description: Movie tidak ditemukan
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    movieController.destroy
);

export default router;