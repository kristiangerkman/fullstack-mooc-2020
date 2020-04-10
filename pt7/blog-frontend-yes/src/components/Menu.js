import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log("add logged in as", user, "to navbar");
  return (
    /*     <div style={{ background: "lightblue" }}>
      <Link style={{ ...style, marginLeft: "4px" }} to="/">
        Blogs
      </Link>
      <Link style={{ ...style }} to="/users">
        Users
      </Link>
      <p style={{ ...style }}>Logged in as {user.name}</p>

    </div> */
    <div>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto ">
            <Nav.Link href="#" as="span">
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/create">New post</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto ">
            <button
              className="btn btn-primary float-right "
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
