import React from "react";
import { connect } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;

  anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const vote = (id, anec) => {
    console.log("vote", id);
    props.likeAnecdote(id);
    props.setNotification(`you voted '${anec}'`, 5);
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

const mapStateToProps = (state) => {
  if (!state.filter.isFilter) {
    return { anecdotes: state.anecdotes };
  } else {
    return {
      anecdotes: state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.filter)
      ),
    };
  }
};

const mapDispatchToProps = {
  setNotification,
  likeAnecdote,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
