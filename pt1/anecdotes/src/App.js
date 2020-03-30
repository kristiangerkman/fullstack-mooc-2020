import React, { useState, useEffect } from "react";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const tmp = new Array(props.anecdotes.length);
    for (let i = 0; i < tmp.length; i++) {
      tmp[i] = 0;
    }
    setPoints(tmp);
    // eslint-disable-next-line
  }, []);

  const ReturnMostVoted = points => {
    let max = points[0];
    let maxIndex = 0;

    for (let i = 1; i < points.length; i++) {
      if (points[i] > max) {
        maxIndex = i;
        max = points[i];
      }
    }

    return maxIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      <p>has {points[selected]} points</p>

      <button
        onClick={() => {
          while (1) {
            let newNum = Math.floor(
              Math.random() * Math.floor(props.anecdotes.length)
            );
            console.log("asd" + newNum);
            if (newNum !== selected) {
              setSelected(newNum);
              break;
            }
          }
        }}
      >
        Next anecdote
      </button>
      <button
        onClick={() => {
          let copy = [...points];
          copy[selected] += 1;
          setPoints(copy);
        }}
      >
        vote
      </button>
      <h1>Anecdote with most votes</h1>

      {props.anecdotes[ReturnMostVoted(points)]}
      <br />
      <p>has {points[ReturnMostVoted(points)]} points</p>
    </div>
  );
};

export default App;
