import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  if (blogs.length === 0) {
    return <h3>No blog posts yet</h3>;
  } else {
    return (
      <div className="col-10 container mt-2 mb-2">
        <div className="main-section">
          <h2>All blogs</h2>

          <div className="modal-content">
            <Table striped bordered hover size="sl" variant="dark">
              <tbody>
                <tr>
                  <td colSpan="2">Title</td>
                  <td>Author</td>
                </tr>
                {blogs.map((b) => (
                  <tr key={b.id}>
                    <td colSpan="2">
                      <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                    </td>
                    <td>{b.author}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
};

export default Blogs;
