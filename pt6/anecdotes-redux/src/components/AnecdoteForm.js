import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const create = async (e) => {
    e.preventDefault();
    const anec = e.target.newAnec.value;
    e.target.newAnec.value = "";

    dispatch(createAnecdote(anec));
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

export default AnecdoteForm;
