import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(p => (
        <p>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
