import React, { useState } from "react";
import weatherService from "../weatherService";
const Country = ({ country }) => {
  const c = country;
  const [weather, setWeather] = useState(null);
  weatherService.getWeather(c.name).then((r) => setWeather(r));
  if (weather !== null && weather.success !== false) {
    console.log(weather);
    return (
      <div>
        <h2>{c.name}</h2>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p>
        <h3>language</h3>
        <ul>
          {c.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <br />
        <img src={c.flag} alt="asd" width="210" />
        <h3>Weather in {c.capital}</h3>
        <b>temperature: </b> {weather.current.temperature} celcius <br />
        <img src={`${weather.current.weather_icons}`} alt="asd" width="100" />
        <br />
        <b>
          wind: {weather.current.wind_speed} mph(?) direction{" "}
          {weather.current.wind_dir}
        </b>
      </div>
    );
  } else {
    // did some react magic and used all 1000/mo request in few mins :)
    //not sure if it works but it should.. cant really test it
    return (
      <div>
        <h2>{c.name}</h2>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p>
        <h3>language</h3>
        <ul>
          {c.languages.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
        <br />
        <img src={c.flag} alt="asd" width="210" />{" "}
      </div>
    );
  }
};

export default Country;
