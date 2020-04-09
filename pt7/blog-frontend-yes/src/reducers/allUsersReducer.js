import userService from "../services/user";
export const initAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({ type: "INIT_ALL_USERS", data: users });
    } catch (e) {
      console.log(e);
    }
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ALL_USERS":
      return action.data;
    case "UPDATE_ALL_USERS":
    default:
      return state;
  }
};

export default reducer;
