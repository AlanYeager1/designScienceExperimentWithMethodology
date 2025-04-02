import React from "react";

interface Restaurant {
  id: number;
  name: string;
  opening_hours: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.opening_hours}</p>
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
