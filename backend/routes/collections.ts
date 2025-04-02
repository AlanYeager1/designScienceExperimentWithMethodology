import express from "express";
import {
  createCollection,
  getCollections,
  addRestaurantToCollection,
} from "../services/collectionService"; // Ensure this file exists or correct the path

export const collectionRouter = express.Router();

collectionRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const collection = await createCollection(name);
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Failed to create collection" });
  }
});

collectionRouter.get("/", async (req, res) => {
  try {
    const collections = await getCollections();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});

collectionRouter.post("/:id/restaurants", async (req, res) => {
  const { id } = req.params;
  const { restaurantId } = req.body;
  try {
    const updatedCollection = await addRestaurantToCollection(id, restaurantId);
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: "Failed to add restaurant to collection" });
  }
});
