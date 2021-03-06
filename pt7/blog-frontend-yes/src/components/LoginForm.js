import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { BrowserRouter as Router, Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(credentials));
  };

  return (
    <div className="container">
      <div className="modal-dialog">
        <div className="main-section col-sm-12">
          <div className="modal-content">
            <br />
            <h2 className="text-center">Log in</h2>
            <br />
            <form onSubmit={handleLogin}>
              <div className="form-group col-12">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={({ target }) =>
                    setCredentials({
                      username: target.value,
                      password: credentials.password,
                    })
                  }
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={({ target }) =>
                    setCredentials({
                      username: credentials.username,
                      password: target.value,
                    })
                  }
                  placeholder="Enter password"
                />{" "}
              </div>
              <div className="col-12 form-group">
                <button
                  className="btn btn-primary col-3 float-left"
                  id="login-button"
                  type="submit"
                >
                  Login
                </button>
                <br />
              </div>
              <div className="col-12 form-group">
                <small>
                  <Link className="flat-left" to="/register">
                    Don't have an account?
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
