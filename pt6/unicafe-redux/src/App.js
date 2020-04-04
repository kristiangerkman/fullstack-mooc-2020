import React from "react";

const App = ({ store }) => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const zero = () => {
    store.dispatch({
      type: "ZERO",
    });
  };
  const all = Number(
    store.getState().bad + store.getState().ok + store.getState().good
  );
  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>zero</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {all}</div>
      <div>
        average {Number(store.getState().good - store.getState().bad) / all}
      </div>
    </div>
  );
};

export default App;
