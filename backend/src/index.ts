import express from "express";
import dotenv from "dotenv";
import etlRoutes from "./api/etl";
import restaurantRoutes from "./api/restaurants";
import collectionRoutes from "./api/collections";
import pool from "./db/connection";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/etl", etlRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/collections", collectionRoutes);

// Ensure database connection is tested
pool.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
