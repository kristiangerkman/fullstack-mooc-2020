import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./reducers/blogsReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import allUsersReducer from "./reducers/allUsersReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  users: allUsersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
