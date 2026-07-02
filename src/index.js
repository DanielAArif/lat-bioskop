import dotenv from "dotenv";
import app from "./server.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("✅ Database Connected");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (err) {

        console.error(err);

    }
};

startServer();