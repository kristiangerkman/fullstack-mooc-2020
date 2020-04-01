import React from "react";
import PersonsModule from "../modules/PersonsModule";

const Persons = ({ persons, setPersons, filtered, isFilter }) => {
  const deletePersonOnClick = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      PersonsModule.deletePerson(id);
      setPersons(persons.filter(p => p.id !== id));
    }
  };
  if (isFilter) {
    return (
      <div>
        {filtered.map(p => (
          <div>
            <p key={p.name}>
              {p.name} {p.number}
            </p>
            <button onClick={() => deletePersonOnClick(p.id, p.name)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {persons.map(p => (
          <div>
            <p key={p.name}>
              {p.name} {p.number}
            </p>
            <button onClick={() => deletePersonOnClick(p.id, p.name)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Persons;
