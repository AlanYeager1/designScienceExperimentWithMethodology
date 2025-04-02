import express from "express";
import pool from "../db/connection";

const router = express.Router();

router.get("/", async (req, res) => {
  const { name, openAt } = req.query;

  try {
    const query = `
            SELECT * FROM restaurants
            WHERE ($1::text IS NULL OR name ILIKE '%' || $1 || '%')
            AND ($2::time IS NULL OR EXISTS (
                SELECT 1 FROM jsonb_array_elements(opening_hours) AS hours
                WHERE $2::time BETWEEN (hours->>'open_time')::time AND (hours->>'close_time')::time
            ));
        `;
    const result = await pool.query(query, [name, openAt]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).send("Failed to fetch restaurants.");
  }
});

export default router;
