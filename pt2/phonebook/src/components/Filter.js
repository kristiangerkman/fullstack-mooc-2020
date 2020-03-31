import React from "react";

const Filter = ({ filter, setFilter, persons, setFiltered }) => {
  const changeHandler = e => {
    e.preventDefault();
    setFilter(e.target.value);
    filterPersons(e.target.value);
  };

  const filterPersons = v => {
    const newFiltered = [];
    persons.map(p => {
      if (p.name.toLowerCase().includes(v)) {
        newFiltered.push(p);
      }
    });
    setFiltered(newFiltered);
  };
  return (
    <div>
      <input
        value={filter}
        onChange={changeHandler}
        placeholder="filter.."
      ></input>
    </div>
  );
};

export default Filter;
