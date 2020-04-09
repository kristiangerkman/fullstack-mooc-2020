import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const style = {
    display: "inline-block",
    marginRight: "8px",
  };

  return (
    <div style={{ background: "lightblue" }}>
      <Link style={{ ...style, marginLeft: "4px" }} to="/">
        Blogs
      </Link>
      <Link style={{ ...style }} to="/users">
        Users
      </Link>
      <p style={{ ...style }}>Logged in as {user.name}</p>
      <button
        style={{ ...style }}
        type="submit"
        onClick={() => {
          window.localStorage.clear();
          dispatch({ type: "LOGOUT_USER" });
          history.push("/");
        }}
      >
        {" "}
        Log out{" "}
      </button>
    </div>
  );
};

export default Menu;
