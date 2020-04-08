import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const SingleAnec = ({ anecs }) => {
  const id = useParams().id;
  const anec = anecs.find((a) => Number(a.id) === Number(id));
  if (anec) {
    return (
      <div>
        <h1>{anec.content}</h1>
        <p>has {anec.votes} votes</p>
        <p>
          for more info see{" "}
          <a href={anec.info} target="_blank">
            {anec.info}
          </a>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }
};

export default SingleAnec;
