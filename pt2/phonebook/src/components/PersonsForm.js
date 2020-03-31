import React from "react";

const PersonsForm = ({ persons, setPersons, newPerson, setNewPerson }) => {
  const pHandler = e => {
    e.preventDefault();
    let names = [];
    names = persons.map(p => p.name);
    if (names.includes(newPerson.name)) {
      window.alert(`The phonebook already has someone named ${newPerson.name}`);
    } else {
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
      setNewPerson({ name: "", number: "" });
    }
  };

  const onPChangeName = e => {
    e.preventDefault();
    setNewPerson({ ...newPerson, name: e.target.value });
  };
  const onPChangeNumber = e => {
    e.preventDefault();
    setNewPerson({ ...newPerson, number: e.target.value });
  };
  return (
    <div>
      <form onSubmit={pHandler}>
        Name:
        <input
          name="name"
          onChange={onPChangeName}
          value={newPerson.name}
          placeholder="name..."
        ></input>
        <br />
        Number:
        <input
          name="number"
          onChange={onPChangeNumber}
          value={newPerson.number}
          placeholder="number..."
        ></input>
        <br />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default PersonsForm;
