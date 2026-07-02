import dotenv from "dotenv";
import pool from "./config/db.js";
import app from "./server.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Berhasil terhubung ke MySQL");
        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Gagal terhubung ke database");
        console.error(error.message);
    }
};

startServer();