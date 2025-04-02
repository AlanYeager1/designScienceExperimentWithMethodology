import pool from "./connection";

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const restaurantQuery = `
            INSERT INTO restaurants (name, opening_hours)
            VALUES
            ('Pizza Palace', '[{"day": "Monday", "open_time": "11:00", "close_time": "22:00"}]'),
            ('Burger Barn', '[{"day": "Tuesday", "open_time": "10:00", "close_time": "20:00"}]')
            ON CONFLICT (name) DO NOTHING;
        `;
    await client.query(restaurantQuery);

    const collectionQuery = `
            INSERT INTO collections (name, description)
            VALUES
            ('Vegetarian Favourites', 'A collection of vegetarian-friendly restaurants'),
            ('Meat Lovers', 'A collection of meat-heavy restaurants')
            ON CONFLICT DO NOTHING;
        `;
    await client.query(collectionQuery);

    await client.query("COMMIT");
    console.log("Database seeded successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error seeding database:", error);
  } finally {
    client.release();
  }
};

seedDatabase();
