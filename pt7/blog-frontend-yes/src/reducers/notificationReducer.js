const initialState = {
  message: "message",
  type: "bad",
  show: true,
  timerID: 0,
};

export const setNotification = (message, type, time) => {
  return async (dispatch) => {
    const timerID = setTimeout(
      () =>
        dispatch({
          type: "HIDE_NOTIFICATION",
        }),
      time * 1000
    );
    dispatch({
      type: "SET_NOTIFICATION",
      data: { message, timerID, type },
    });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(state.timerID);
      return {
        message: action.data.message,
        show: true,
        timerID: action.data.timerID,
        type: action.data.type,
      };
    case "HIDE_NOTIFICATION":
      return { message: "", show: false };
    default:
      return state;
  }
};

export default reducer;
