import loginService from "../services/login";
import blogService from "../services/blog";
import userService from "../services/user";

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "INIT_USER", data: user });
      blogService.setToken(user.token);
    } else {
      dispatch({ type: "INIT_USER", data: null });
    }
  };
};

export const loginUser = (credential) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credential);
      dispatch({ type: "LOGIN_USER", data: user });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (e) {
      //setnotification
      console.log(e);
    }
  };
};

export const registerUser = (username, name, password) => {
  return async (dispatch) => {
    const credential = { username, name, password };
    try {
      await userService.create(credential);
      const user = await loginService.login({
        username: credential.username,
        password: credential.password,
      });
      dispatch({ type: "LOGIN_USER", data: user });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export default reducer;
