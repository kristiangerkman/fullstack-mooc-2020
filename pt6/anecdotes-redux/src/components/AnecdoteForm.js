import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const create = async (e) => {
    e.preventDefault();
    const anec = e.target.newAnec.value;
    e.target.newAnec.value = "";

    props.createAnecdote(anec);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input type="text" name="newAnec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, { createAnecdote })(AnecdoteForm);

export default ConnectedAnecdoteForm;
