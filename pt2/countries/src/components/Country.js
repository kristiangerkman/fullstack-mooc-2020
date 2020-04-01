import React from "react";

const Country = ({ country }) => {
  const c = country[0];
  return (
    <div>
      <h2>{c.name}</h2>
      <p>capital {c.capital}</p>
      <p>population {c.population}</p>
      <h3>language</h3>
      <lu>
        {c.languages.map(l => (
          <li key={l.name}>{l.name}</li>
        ))}
      </lu>
      <br />
      <img src={c.flag} alt="image missing" width="210" />
    </div>
  );
};

export default Country;
