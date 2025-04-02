import { db } from "../utils/db";

// Ensure `open_time` and `close_time` are stored as `time` in the database schema.
export const getRestaurants = async (name: string, openAt: string) => {
  const query = `
    SELECT * FROM restaurants
    WHERE name ILIKE $1 AND $2::time BETWEEN open_time AND close_time
  `;
  const values = [`%${name}%`, openAt];
  const result = await db.query(query, values);
  return result.rows;
};
