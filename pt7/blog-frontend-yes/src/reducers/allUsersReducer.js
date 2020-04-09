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

export const updateAllUsers = (id) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.getUser(id);
      dispatch({ type: "UPDATE_ALL_USERS", data: updatedUser });
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
      return state.map((u) => (u.id === action.data.id ? action.data : u));
    default:
      return state;
  }
};

export default reducer;
