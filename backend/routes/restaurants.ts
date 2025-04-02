import express from "express";
import { getRestaurants } from "../services/restaurantService";

export const restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
  const { name = "", openAt = "" } = req.query; // Default to empty strings
  try {
    const restaurants = await getRestaurants(name as string, openAt as string);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});
