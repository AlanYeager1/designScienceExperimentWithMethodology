import React, { useState } from "react";

interface FilterUIProps {
  onFilter: (name: string, openAt: string) => void;
}

const FilterUI: React.FC<FilterUIProps> = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [openAt, setOpenAt] = useState("");

  const handleFilter = () => {
    onFilter(name, openAt);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={openAt}
        onChange={(e) => setOpenAt(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterUI;
