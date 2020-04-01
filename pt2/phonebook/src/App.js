import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import PersonsModule from "./modules/PersonsModule";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [notification, setNotification] = useState({
    type: "", //good or bad
    show: false,
    message: ""
  });

  useEffect(() => {
    PersonsModule.getAll().then(r => setPersons(r));
  }, [setPersons]);

  useEffect(() => {
    if (filter.length > 0) {
      setIsFilter(true);
    }
  }, [filter.length]);

  const showNotification = () => {
    if (notification.show) {
      return (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      );
    }
  };

  return (
    <div>
      {showNotification()}
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
        setNotification={setNotification}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filtered={filtered}
        setFiltered={setFiltered}
        isFilter={isFilter}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
