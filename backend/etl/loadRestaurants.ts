import fs from "fs";
import csvParser from "csv-parser";
import { db } from "../utils/db";

const loadRestaurants = async () => {
  const filePath = "restaurant_details.csv";
  const restaurants: { name: string; open_time: string; close_time: string }[] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      restaurants.push(row);
    })
    .on("end", async () => {
      for (const restaurant of restaurants) {
        const checkQuery = `
          SELECT * FROM restaurants
          WHERE name = $1 AND open_time = $2 AND close_time = $3
        `;
        const checkValues = [
          restaurant.name,
          restaurant.open_time,
          restaurant.close_time,
        ];
        const checkResult = await db.query(checkQuery, checkValues);

        if (checkResult.rows.length === 0) {
          const query = `
            INSERT INTO restaurants (name, open_time, close_time)
            VALUES ($1, $2, $3)
          `;
          const values = [
            restaurant.name,
            restaurant.open_time,
            restaurant.close_time,
          ];
          await db.query(query, values);
        }
      }
      console.log("Restaurants loaded successfully.");
    });
};

loadRestaurants();
