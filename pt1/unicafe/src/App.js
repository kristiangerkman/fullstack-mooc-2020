import React, { useState } from "react";

const Stat = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Stat text={"good"} value={good} />
          <Stat text={"neutral"} value={neutral} />
          <Stat text={"bad"} value={bad} />
          <Stat text={"all"} value={good + bad + neutral} />
          <Stat
            text={"average"}
            value={(good - bad) / (good + bad + neutral)}
          />
          <Stat
            text={"positive"}
            value={(good / (good + bad + neutral)) * 100 + "%"}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>

        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    );
  }
};

export default App;
