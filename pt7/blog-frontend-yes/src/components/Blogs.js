import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const styleDiv = {
    border: "1px black solid",
    marginBottom: "3px",
  };

  if (blogs.length === 0) {
    return <h3>No blog posts yet</h3>;
  } else {
    return (
      <div>
        <Table striped>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id}>
                <td>
                  <Link to={`/blogs/${b.id}`}>
                    {b.title} by {b.author}
                  </Link>
                </td>
                <td>{b.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default Blogs;
