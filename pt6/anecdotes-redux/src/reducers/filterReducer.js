const initailState = {
  filter: "",
  isFilter: false,
};

export const setFilter = (str) => {
  if (str.length > 0) {
    return {
      type: "SET_FILTER",
      data: str,
    };
  } else {
    return { type: "REMOVE_FILTER" };
  }
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { filter: action.data, isFilter: true };
    case "REMOVE_FILTER":
      return { filter: "", isFIlter: false };
    default:
      return state;
  }
};

export default reducer;
