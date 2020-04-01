import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(r => setCountries(r.data))
      .catch(e => console.log(e));
  }, [setCountries]);

  if (filtered.length > 10) {
    return (
      <div>
        <Filter
          filter={filter}
          setFilter={setFilter}
          countries={countries}
          setFiltered={setFiltered}
        />

        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (filtered.length > 1) {
    return (
      <div>
        <Filter
          filter={filter}
          setFilter={setFilter}
          countries={countries}
          setFiltered={setFiltered}
        />
        {filtered.map(c => {
          return (
            <div>
              <p key={c.name}>{c.name}</p>
            </div>
          );
        })}
      </div>
    );
  } else if (filtered.length === 1) {
    return (
      <div>
        <Filter
          filter={filter}
          setFilter={setFilter}
          countries={countries}
          setFiltered={setFiltered}
        />
        <Country country={filtered} />
      </div>
    );
  } else {
    return (
      <div>
        <Filter
          filter={filter}
          setFilter={setFilter}
          countries={countries}
          setFiltered={setFiltered}
        />
        <p>Search for countries</p>
      </div>
    );
  }
};

export default App;
