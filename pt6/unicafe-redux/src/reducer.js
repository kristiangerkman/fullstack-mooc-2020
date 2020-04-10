const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  let newState = {};
  switch (action.type) {
    case "GOOD":
      newState = {
        ...state,
        good: state.good + 1,
      };
      console.log(newState);

      return newState;
    case "OK":
      newState = {
        ...state,
        ok: state.ok + 1,
      };
      console.log(newState);
      return newState;
    case "BAD":
      newState = {
        ...state,
        bad: state.bad + 1,
      };
      console.log(newState);

      return newState;
    case "ZERO":
      state = {
        good: 0,
        ok: 0,
        bad: 0,
      };
      return state;
    default:
      return state;
  }
};

export default counterReducer;
