import React, { useState, useEffect } from "react";
import FilterUI from "../components/FilterUI";
import RestaurantList from "../components/RestaurantList";
import CollectionList from "../components/CollectionList";

interface Restaurant {
  id: number;
  name: string;
  opening_hours: string;
}

const HomePage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [collections, setCollections] = useState([]);

  const handleFilter = async (name: string, openAt: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/restaurants?name=${name}&openAt=${openAt}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      alert("An error occurred while fetching restaurants. Please try again.");
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/collections`);
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
      alert("An error occurred while fetching collections. Please try again.");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Restaurant Finder</h1>
      <FilterUI onFilter={handleFilter} />
      <RestaurantList restaurants={restaurants} />
      <CollectionList collections={collections} />
    </div>
  );
};

export default HomePage;
