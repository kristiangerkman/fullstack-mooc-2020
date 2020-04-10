import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((r) => setCountries(r.data))
      .catch((e) => console.log(e));
  }, [setCountries]);

  const whatToShow = () => {
    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1 && country.name === undefined) {
      return (
        <div>
          {filtered.map((c) => {
            return (
              <div key={c.name}>
                <p style={{ display: "inline-block" }}>{c.name}</p>
                <button onClick={() => setCountry(c)}>show</button>
              </div>
            );
          })}
        </div>
      );
    } else if (filtered.length === 1 || country.name !== undefined) {
      return (
        <Country country={country} weather={weather} setWeather={setWeather} />
      );
    } else {
      return <p>Search for countries</p>;
    }
  };

  return (
    <div>
      <Filter
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setFiltered={setFiltered}
        setCountry={setCountry}
      />
      {whatToShow()}
    </div>
  );
};

export default App;
