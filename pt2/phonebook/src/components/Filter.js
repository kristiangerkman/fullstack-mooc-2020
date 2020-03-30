import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <input value={filter} placeholder="filter.."></input>
    </div>
  );
};

export default Filter;
