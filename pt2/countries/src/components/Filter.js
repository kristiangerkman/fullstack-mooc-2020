import React from "react";

const Filter = ({ filter, setFilter, countries, setFiltered }) => {
  const changeHandler = e => {
    e.preventDefault();
    setFilter(e.target.value);
    filterCountires(e.target.value);
  };

  const filterCountires = v => {
    const newFiltered = [];
    countries.map(c => {
      if (c.name.toLowerCase().includes(v)) {
        newFiltered.push(c);
      }
    });
    console.log(newFiltered);
    setFiltered(newFiltered);
  };
  return (
    <div>
      find countries
      <input
        value={filter}
        onChange={changeHandler}
        placeholder="filter.."
      ></input>
    </div>
  );
};

export default Filter;
