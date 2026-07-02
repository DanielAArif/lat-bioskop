import express from "express";

import * as bookingController from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Booking Management
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Mendapatkan semua booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil
 */
router.get(
    "/",
    roleMiddleware("admin"),
    bookingController.index
);

/**
 * @swagger
 * /api/bookings/my-bookings:
 *   get:
 *     summary: Mendapatkan booking milik customer
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil
 */
router.get(
    "/my-bookings",
    roleMiddleware("customer"),
    bookingController.myBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Detail booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: B001
 *     responses:
 *       200:
 *         description: Berhasil
 */
router.get("/:id", bookingController.show);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Membuat booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         description: Booking berhasil dibuat
 */
router.post(
    "/",
    roleMiddleware("customer"),
    bookingController.store
);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Mengubah status booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: B001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingRequest'
 *     responses:
 *       200:
 *         description: Status booking berhasil diperbarui
 */
router.put(
    "/:id/status",
    roleMiddleware("admin"),
    bookingController.updateStatus
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Menghapus booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: B001
 *     responses:
 *       200:
 *         description: Booking berhasil dihapus
 */
router.delete(
    "/:id",
    roleMiddleware("admin"),
    bookingController.destroy
);

export default router;