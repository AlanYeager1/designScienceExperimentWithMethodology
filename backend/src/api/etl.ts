import express from "express";
import fs from "fs";
import csvParser from "csv-parser";
import pool from "../db/connection";

const router = express.Router();

router.post("/etl/upload", async (req, res) => {
  const filePath = "./restaurant_details.csv";

  try {
    const restaurants: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        const { name, opening_hours } = row;
        restaurants.push({ name, opening_hours: JSON.parse(opening_hours) });
      })
      .on("end", async () => {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");

          for (const restaurant of restaurants) {
            const insertQuery = `
                            INSERT INTO restaurants (name, opening_hours)
                            VALUES ($1, $2)
                            ON CONFLICT (name) DO NOTHING;
                        `;
            await client.query(insertQuery, [
              restaurant.name,
              restaurant.opening_hours,
            ]);
          }

          await client.query("COMMIT");
          res.status(200).send("ETL process completed successfully.");
        } catch (error) {
          await client.query("ROLLBACK");
          console.error("Error during ETL process:", error);
          res.status(500).send("ETL process failed.");
        } finally {
          client.release();
        }
      });
  } catch (error) {
    console.error("Error reading CSV file:", error);
    res.status(500).send("Failed to process CSV file.");
  }
});

export default router;
