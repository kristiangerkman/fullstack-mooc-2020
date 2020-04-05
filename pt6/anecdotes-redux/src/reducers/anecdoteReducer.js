import anecService from "../services/anecdotes";
export const initializeAnecs = () => {
  return async (dispatch) => {
    const anecs = await anecService.getAll();
    dispatch({ type: "INIT_ANEC", data: anecs });
  };
};

export const likeAnecdote = (id) => {
  return async (dispatch) => {
    const likedAnec = await anecService.like(id);
    dispatch({
      type: "LIKE_ANEC",
      data: { likedAnec },
    });
  };
};

export const createAnecdote = (anec) => {
  return async (dispatch) => {
    const newAnec = await anecService.create(anec);
    dispatch({ type: "NEW_ANEC", data: newAnec });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NEW_ANEC":
      return state.concat(action.data);
    case "LIKE_ANEC":
      return state.map((a) =>
        a.id === action.data.likedAnec.id ? action.data.likedAnec : a
      );
    case "INIT_ANEC":
      return action.data;

    default:
      return state;
  }
};

export default reducer;
