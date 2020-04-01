import React from "react";
import PersonsModule from "../modules/PersonsModule";

const PersonsForm = ({
  persons,
  setPersons,
  newPerson,
  setNewPerson,
  setNotification
}) => {
  const getId = () => {
    const p = persons.filter(p => p.name === newPerson.name);
    return p[0].id;
  };

  const pHandler = e => {
    e.preventDefault();
    let names = [];
    names = persons.map(p => p.name);
    if (names.includes(newPerson.name)) {
      if (
        window.confirm(
          `The phonebook already has someone named "${newPerson.name}" do you want to update the number?`
        )
      ) {
        PersonsModule.update(getId(), newPerson)
          .then(r => {
            setPersons(persons.map(p => (p.id !== getId() ? p : r)));
          })
          .catch(e => {
            alert(
              `The person with name ${newPerson.name} has already been deleted`
            );
            setPersons(persons.filter(p => p.id !== getId()));
          });
      }
    } else {
      PersonsModule.create(newPerson);

      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
      setNotification({ type: "add", show: true, name: newPerson.name });
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
