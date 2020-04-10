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
  const all =
    store.getState().bad + store.getState().ok + store.getState().good;

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>zero</button>
      {all === 0 ? (
        <p>No votes so far</p>
      ) : (
        <div>
          <div>good {store.getState().good}</div>
          <div>ok {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
          <div>all {all === 1 ? 0 : all}</div>
          <div>
            average{" "}
            {isNaN((store.getState().good - store.getState().bad) / all)
              ? 0
              : (store.getState().good - store.getState().bad) / all}
          </div>
          <div>
            positive{" "}
            {isNaN((store.getState().good / all) * 100)
              ? 0
              : (store.getState().good / all) * 100}{" "}
            %
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
