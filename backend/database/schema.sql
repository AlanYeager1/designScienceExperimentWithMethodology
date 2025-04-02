CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  open_time TIME NOT NULL,
  close_time TIME NOT NULL
);

CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE collection_restaurants (
  id SERIAL PRIMARY KEY,
  collection_id INT REFERENCES collections(id) ON DELETE CASCADE,
  restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE
);
