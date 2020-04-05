import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (!state.filter.isFilter) {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.filter)
      );
    }
  });

  anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const vote = (id, anec) => {
    console.log("vote", id);
    dispatch(likeAnecdote(id));
    dispatch(setNotification(`you voted '${anec}'`));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
