import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <br />
      <h2>Users</h2>
      <br />

      <Table striped bordered hover size="sl" variant="dark">
        <tbody>
          <tr>
            <td>Username</td>
            <td>Name</td>
            <td>No. of blogs</td>
          </tr>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
