const initialState = {
  message: "",
  show: false,
};

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: message,
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.data, show: true };
    case "HIDE_NOTIFICATION":
      return { message: "", show: false };
    default:
      return state;
  }
};

export default reducer;
