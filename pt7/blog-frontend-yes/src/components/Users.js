import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      <table style={{ width: "150px" }}>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
