import React from "react";

const Filter = ({ filter, setFilter, countries, setFiltered, setCountry }) => {
  const changeHandler = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    filterCountires(e.target.value);
  };

  const filterCountires = (v) => {
    setCountry({});
    const newFiltered = countries.filter(
      (c) => c.name.toLowerCase().includes(v.toLowerCase()) === true
    );

    setFiltered(newFiltered);
    if (newFiltered.length === 1) {
      setCountry(newFiltered[0]);
    }
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
