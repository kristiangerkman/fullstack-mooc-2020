import React from "react";
import PersonsModule from "../modules/PersonsModule";

const Persons = ({
  persons,
  setPersons,
  filtered,
  setFiltered,
  isFilter,
  setNotification
}) => {
  const deletePersonOnClick = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      PersonsModule.deletePerson(id)
        .then(r =>
          setNotification({
            type: "bad",
            show: true,
            message: `Deleted ${name} from the phonebook`
          })
        )
        .catch(e =>
          setNotification({
            type: "bad",
            show: true,
            message: `The person with name ${name} has already been deleted`
          })
        );
      setPersons(persons.filter(p => p.id !== id));
      if (isFilter) {
        setFiltered(filtered.filter(p => p.id !== id));
      }
    }
  };
  if (isFilter) {
    return (
      <div>
        {filtered.map(p => (
          <div key={p.id}>
            <p style={{ display: "inline-block", marginRight: "5px" }}>
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
        {persons.map(p => {
          console.log(p);
          return (
            <div key={p.id}>
              <p style={{ display: "inline-block", marginRight: "5px" }}>
                {p.name} {p.number}
              </p>
              <button onClick={() => deletePersonOnClick(p.id, p.name)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Persons;
