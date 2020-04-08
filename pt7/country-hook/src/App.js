import React, { useState } from "react";
import Form from "./components/Form";
import Country from "./components/Country";
import { useField, useCountry } from "./hooks";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <Form fetch={fetch} nameInput={nameInput} />
      <Country country={country} />
    </div>
  );
};

export default App;
