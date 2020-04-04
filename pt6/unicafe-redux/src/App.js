import React from "react";

const App = ({ store }) => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  return (
    <div>
      <button onClick={good}>hyvä</button>
      <button>neutraali</button>
      <button>huono</button>
      <button>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali</div>
      <div>huono</div>
    </div>
  );
};

export default App;
