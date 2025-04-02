import express from "express";
import pool from "../db/connection";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, restaurantIds } = req.body;

  try {
    const insertCollectionQuery = `
      INSERT INTO collections (name) VALUES ($1) RETURNING id;
    `;
    const collectionResult = await pool.query(insertCollectionQuery, [name]);
    const collectionId = collectionResult.rows[0].id;

    const insertMappingQuery = `
      INSERT INTO collection_restaurants (collection_id, restaurant_id)
      VALUES ($1, unnest($2::int[]));
    `;
    await pool.query(insertMappingQuery, [collectionId, restaurantIds]);

    res.status(201).send("Collection created successfully.");
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).send("Failed to create collection.");
  }
});

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT c.id, c.name, json_agg(r.*) AS restaurants
      FROM collections c
      LEFT JOIN collection_restaurants cr ON c.id = cr.collection_id
      LEFT JOIN restaurants r ON cr.restaurant_id = r.id
      GROUP BY c.id;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).send("Failed to fetch collections.");
  }
});

router.post("/:id/restaurants", async (req, res) => {
  const { id } = req.params;
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).send("Restaurant ID is required.");
  }

  try {
    const query = `
            INSERT INTO collection_restaurants (collection_id, restaurant_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
        `;
    await pool.query(query, [id, restaurantId]);
    res.status(201).send("Restaurant added to collection.");
  } catch (error) {
    console.error("Error adding restaurant to collection:", error);
    res.status(500).send("Failed to add restaurant to collection.");
  }
});

export default router;
