import { db } from "../utils/db";

export const createCollection = async (name: string) => {
  const query = `INSERT INTO collections (name) VALUES ($1) RETURNING *`;
  const values = [name];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const getCollections = async () => {
  const query = `SELECT * FROM collections`;
  const result = await db.query(query);
  return result.rows;
};

export const addRestaurantToCollection = async (
  collectionId: string,
  restaurantId: string
) => {
  const checkQuery = `
    SELECT * FROM collection_restaurants
    WHERE collection_id = $1 AND restaurant_id = $2
  `;
  const checkValues = [collectionId, restaurantId];
  const checkResult = await db.query(checkQuery, checkValues);

  if (checkResult.rows.length > 0) {
    throw new Error("Restaurant already exists in the collection");
  }

  const query = `
    INSERT INTO collection_restaurants (collection_id, restaurant_id)
    VALUES ($1, $2) RETURNING *
  `;
  const values = [collectionId, restaurantId];
  const result = await db.query(query, values);
  return result.rows[0];
};
