import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import PersonsModule from "./modules/PersonsModule";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    PersonsModule.getAll().then(r => setPersons(r));
  }, [setPersons]);

  useEffect(() => {
    if (filter.length > 0) {
      setIsFilter(true);
    }
  }, [filter.length]);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        setFilter={setFilter}
        persons={persons}
        setFiltered={setFiltered}
      />

      <h3>Add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filtered={filtered}
        isFilter={isFilter}
      />
    </div>
  );
};

export default App;
