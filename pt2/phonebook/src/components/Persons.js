import React from "react";

const Persons = ({ persons, filtered, isFilter }) => {
  if (isFilter) {
    return (
      <div>
        {filtered.map(p => (
          <p key={p.name}>
            {p.name} {p.number}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {persons.map(p => (
          <p key={p.name}>
            {p.name} {p.number}
          </p>
        ))}
      </div>
    );
  }
};

export default Persons;
