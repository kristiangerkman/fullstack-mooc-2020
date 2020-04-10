import React from "react";

import { registerUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(
      registerUser(
        e.target.username.value,
        e.target.name.value,
        e.target.password.value
      )
    );
  };

  return (
    <div className="modal-dialog">
      <div className="main-section col-sm-12">
        <div className="modal-content">
          <br />
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleRegister} autoComplete="off">
            <div className="form-group col-12">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
              />{" "}
            </div>
            <div className="form-group col-12">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
              />{" "}
            </div>
            <div className="form-group col-12">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
              />{" "}
            </div>
            <div className="col-12 form-group">
              <button
                className="btn btn-primary col-3 float-left"
                type="submit"
              >
                Create
              </button>
              <br />
            </div>
          </form>
          <div className="col-12 form-group">
            <small>
              <Link className="float-left" to="/">
                already have and account?
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
