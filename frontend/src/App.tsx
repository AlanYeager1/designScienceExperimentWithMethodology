import React, { useState } from "react";
import FilterUI from "./components/FilterUI";
import RestaurantList from "./components/RestaurantList";

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);

  const handleFilter = async (name: string, openAt: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/restaurants?name=${name}&openAt=${openAt}`
    );
    const data = await response.json();
    setRestaurants(data);
  };

  return (
    <div>
      <h1>Restaurant Finder</h1>
      <FilterUI onFilter={handleFilter} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default App;
